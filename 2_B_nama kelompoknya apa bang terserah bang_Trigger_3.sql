CREATE OR REPLACE FUNCTION check_voucher_validity() RETURNS trigger AS
$$
DECLARE
    kuota_penggunaan INT;
    jumlah_hari_berlaku INT;
    tanggal_sekarang DATE := CURRENT_DATE;
BEGIN
    -- Ambil data voucher dari tabel VOUCHER
    SELECT kuotapenggunaan, jmlhariberlaku 
    INTO kuota_penggunaan, jumlah_hari_berlaku
    FROM voucher WHERE kode = NEW.idvoucher;

    -- Periksa apakah kuota penggunaan voucher sudah habis
    IF kuota_penggunaan IS NOT NULL AND NEW.telahdigunakan >= kuota_penggunaan THEN
        RAISE EXCEPTION 'Voucher % telah mencapai batas jumlah penggunaan', NEW.idvoucher;
    END IF;

    -- Periksa apakah voucher masih dalam masa berlaku
    IF (NEW.tglawal + jumlah_hari_berlaku) < tanggal_sekarang THEN
        RAISE EXCEPTION 'Voucher % telah melewati batas hari berlaku', NEW.idvoucher;
    END IF;

    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER voucher_validity_check
BEFORE INSERT ON tr_pembelian_voucher
FOR EACH ROW
EXECUTE FUNCTION check_voucher_validity();