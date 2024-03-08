import { ReactElement } from "react";

export const ListadoGenerico=(props: listadoGenericoProps)=>{

    return (
        <>
        <code>Listado Genérico {props.children}</code>
        </>
    );
}

interface listadoGenericoProps {
    listado:any;
    children?:ReactElement;
    cargandoUI?: ReactElement;
    listadoVacioUI?: ReactElement;
}

export default ListadoGenerico;