-- --------------------------------------------------------------------------------
-- Routine DDL
-- Note: comments before and after the routine body will not be stored by the server
-- --------------------------------------------------------------------------------
DELIMITER $$

CREATE PROCEDURE `sp_cursos_letras` (in fecha_n int)
BEGIN

declare id int;
declare des varchar(45);
declare lim int;
declare letras int;
declare letra varchar(45);
declare lt varchar(45);

DECLARE i INT DEFAULT 0;
declare lts varchar(45);

declare id_c int;
declare fecha int;
declare id_profesor int;
declare id_especialidad int;


DECLARE fin INTEGER DEFAULT 0;
DECLARE cursos_cursor CURSOR FOR 
    SELECT id_curso, descripcion_curso, limite_curso, cantidad_letras,
    'letra_curso' = 'A' FROM curso WHERE vigencia = 1;
    

-- Condición de salida
DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;

DROP TEMPORARY TABLE IF EXISTS cursos_temp; 
CREATE TEMPORARY TABLE IF NOT EXISTS cursos_temp 
(id_curso_anual int,
nombre_curso_anual varchar(45),
fecha_curso_anual varchar(45),
id_curso int,
descripcion_curso varchar(45),
limite_curso int,
letra_curso varchar(45),
id_profesor int,
id_especialidad int,
estado int);


set lts = 'ABCDEFGHYJKLMNOPQRSTUVXYZ';
set fecha = fecha_n;

  OPEN cursos_cursor;
  get_cursos: LOOP
    FETCH cursos_cursor INTO id, des, lim, letras,letra;

     IF fin = 1 THEN
       LEAVE get_cursos;
    END IF;
    
    set i = 1;
    
    WHILE i <= letras DO
    
    set lt = SUBSTRING(lts,i,1);
    
    set id_c = (select id_curso_anual from
    curso_anual where id_curso = id and
    letra_curso = lt and fecha_curso_anual = fecha);
    
    
    if id_c is null then
        set id_c = 0;
        set id_profesor = 0;
        set id_especialidad = 1;
    else
        set id_profesor = (select curso_anual.id_profesor from
        curso_anual where id_curso_anual = id_c);
        set id_especialidad = (select curso_anual.id_especialidad from
        curso_anual where id_curso_anual = id_c);
    end if;
    
    insert into cursos_temp 
    values(id_c,concat(des,' ',lt),fecha,id,des,letras,lt,id_profesor,id_especialidad,1);

    set i = i+1;
    END WHILE;

    
    
  END LOOP get_cursos;

CLOSE cursos_cursor;

select * from cursos_temp;

END