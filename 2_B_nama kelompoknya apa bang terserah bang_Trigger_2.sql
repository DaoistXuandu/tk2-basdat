CREATE OR REPLACE FUNCTION handle_canceled_order()
RETURNS trigger AS
$$
DECLARE
    user_id UUID;
    total_biaya DECIMAL;
BEGIN
    -- Pastikan hanya memproses jika status adalah "Pesanan Dibatal"
    IF (SELECT Status FROM STATUS_PESANAN WHERE Id = NEW.IdStatus) = 'Pesanan Dibatal' THEN
        -- Ambil data pengguna dan total biaya dari pemesanan jasa
        SELECT IdPelanggan, TotalBiaya
        INTO user_id, total_biaya
        FROM TR_PEMESANAN_JASA
        WHERE Id = NEW.IdTrPemesanan;

        -- Tambahkan kembali saldo pengguna di tabel MyPay
        UPDATE "user"
        SET SaldoMyPay = SaldoMyPay + total_biaya
        WHERE Id = user_id;

    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER refund_saldo_on_cancel
AFTER UPDATE ON TR_PEMESANAN_STATUS
FOR EACH ROW
EXECUTE FUNCTION handle_canceled_order();