CREATE OR REPLACE FUNCTION transfer_nominal_ke_mypay_on_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Cek apakah IdStatus berubah menjadi status "Pesanan selesai"
    IF (NEW.IdStatus IS NOT NULL AND 
        NEW.IdStatus != OLD.IdStatus AND
        EXISTS (
            SELECT 1 
            FROM STATUS_PESANAN 
            WHERE Id = NEW.IdStatus AND Status = 'Pesanan selesai'
        )
    ) THEN
        -- Update saldo MyPay pekerja
        UPDATE "user"
        SET SaldoMyPay = COALESCE(SaldoMyPay, 0) + (
            SELECT TotalBiaya 
            FROM TR_PEMESANAN_JASA 
            WHERE Id = NEW.IdTrPemesanan
        )
        WHERE Id = (
            SELECT IdPekerja 
            FROM TR_PEMESANAN_JASA 
            WHERE Id = NEW.IdTrPemesanan
        );

        -- Masukkan catatan transaksi ke TR_MYPAY
        INSERT INTO TR_MYPAY (Id, UserId, Tgl, Nominal, KategoriId)
        VALUES (
            uuid_generate_v4(),
            (SELECT IdPekerja FROM TR_PEMESANAN_JASA WHERE Id = NEW.IdTrPemesanan),
            CURRENT_DATE,
            (SELECT TotalBiaya FROM TR_PEMESANAN_JASA WHERE Id = NEW.IdTrPemesanan),
            (SELECT Id FROM KATEGORI_TR_MYPAY WHERE Nama = 'Menerima honor transaksi jasa')
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_status_update
AFTER UPDATE OF IdStatus ON TR_PEMESANAN_STATUS
FOR EACH ROW
EXECUTE FUNCTION transfer_nominal_ke_mypay_on_update();