import { useEffect, useState } from "react"
import { StyleSheet } from "react-native"


const style = StyleSheet.create({
    titulo: {
        marginTop: '10px',
        marginBottom: '50px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: '1.25rem',
        fontWeight: '700',
        textAlign: 'center'
    }
})

export default function Dia() {
    const [data, setData] = useState('')
    useEffect(() => {
        const handleData = () => {
            const currentData = new Date().toLocaleDateString('pt-BR')
            setData(currentData)
        }
        handleData()
    }, [])

    return (
        <h1 style={style.titulo}>
            Pauta Dia: {data}
        </h1>
    )
}