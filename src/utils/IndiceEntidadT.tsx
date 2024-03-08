import { ReactElement, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Paginacion from "./Paginacion";
import ListadoGenerico from "./ListadoGenerico";

export const IndiceEntidadT = <T extends {}>(props: indiceEntidadTProps<T>) => {

    const [entidades, setEntidades]=useState<T[]>();
    const[totalDePaginas, setTotalDePaginas]=useState(0);
    const [recordsPorPagina,setRecordsPorPagina] = useState(15);
    const [pagina,setPagina] =useState(1);


    useEffect(()=>{
        console.log(props.url);
        axios.get(props.url, {
            params:{pagina, recordsPorPagina}
        })
        .then((respuesta:AxiosResponse<T[]>)=>{        
            //Conectar la paginación
            const totalDeRegistros = parseInt(respuesta.headers['cantidadtotalregistros'],10);
            setTotalDePaginas(Math.ceil(totalDeRegistros/recordsPorPagina));
              setEntidades(respuesta.data);      
        })
    
    },[pagina, recordsPorPagina])
    



    return(
        <>
        <div className="container"> 
        <h3>{props.titulo}</h3>

        <div className="form-group" style={{width:'150px'}} > 
        <label>Filas por página</label>
        <select 
            className="form-control"
            defaultValue={10}
            onChange={e=>{
            setPagina(1);
            setRecordsPorPagina(parseInt(e.currentTarget.value,10))}}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
        </select>
        </div>

            <ListadoGenerico listado={entidades} />

            <table className="table table-light table-striped table-hover custom-table ">
                {props.children(entidades!)}
            </table>

            <Paginacion 
            cantidadTotalDePaginas={totalDePaginas}
            paginaActual={pagina}
            onChange={nuevaPagina=>setPagina(nuevaPagina)}
        />
        
        </div>
        </>
    );

}

interface indiceEntidadTProps<T> {
    url: string;
    urlCrear?: string;
    children(entidades: T[],
        botones?: (urlEditar: string, id: number) => ReactElement): ReactElement;
    titulo: string;
    nombreEntidad?: string;
}
export default IndiceEntidadT;