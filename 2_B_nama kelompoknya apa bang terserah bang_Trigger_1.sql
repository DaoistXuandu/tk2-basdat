CREATE OR REPLACE FUNCTION CHECK_NoHP() RETURNS trigger AS
$$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM "user"
        WHERE NoHP = NEW.NoHP
    ) 
    THEN
    RAISE EXCEPTION 'No HP % telah terdaftar', NEW.NoHP;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER NoHP_VIOLATION
BEFORE INSERT OR UPDATE OF NoHP
ON "user"
FOR EACH ROW EXECUTE PROCEDURE CHECK_NoHP();


CREATE OR REPLACE FUNCTION CHECK_BANK_ACCOUNT() RETURNS trigger AS
$$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM PEKERJA
        WHERE NEW.NomorRekening = NomorRekening AND NEW.NamaBank = NamaBank
    ) 
    THEN
    RAISE EXCEPTION 'Rekening bank dengan nama bank % dan nomor rekening % telah terdaftar', NEW.NomorRekening, NEW.NamaBank;
    END IF;
    RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER BANK_VIOLATION
BEFORE INSERT OR UPDATE OF NomorRekening, NamaBank
ON PEKERJA
FOR EACH ROW EXECUTE PROCEDURE CHECK_BANK_ACCOUNT(); 
