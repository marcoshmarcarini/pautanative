import { useEffect, useState } from "react"
import { db } from '../../utils/firestore'
import { arrayUnion, collection, doc, deleteDoc, getDoc, getDocs, orderBy, query, updateDoc, where, setDoc } from 'firebase/firestore'
//import img from 'next/img'
import useSWR, { mutate } from 'swr'
import { StyleSheet } from 'react-native'




const fetcher = async (url) => {
  const response = await fetch(url)
  return response.json()
}

const styles = StyleSheet.create({
  tabelaContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '20px',
    padding: '50px'
  },
  tCard: {
    width: '100%',
    maxHeight: '400px',
    height: '100%',
    backgroundColor: '#cbd5e1',
    color: '#0f172a',
    textAlign: 'center',
    boxShadow: '4px 5px 5px #9ca3af80'
  },
  cardTitulo: {
    backgroundColor: '#fb923c',
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    margin: 0
  },
  cardItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    rowGap: '5px',
    color: '#2d2d2d',
    padding: '0 10px',
    fontWeight: '700',
    fontSize: '1rem'
  },
  cardList: {
    padding: '0',
    listStyleType: 'none'
  },
})

export default function Tabela() {
  /* Não é necessário fazer uma tabela e sim um card. */
  const { data: jobsData, mutate } = useSWR('/api/jobs', fetcher)
  const [jobs = jobsData, setJobs] = useState({
    bruno: [], dani: [], juninho: [],
    leandro: [], luiz: [], rafaela: [],
    renan: [], rodolfo: [], thiago: [],
    victoria: [],
  })

  

  const fetchData = async () => {

    const bruno = query(collection(db, "jobs"), where("responsavelJob", "==", "Bruno"), orderBy('timeStamp', 'desc'))
    const dani = query(collection(db, "jobs"), where("responsavelJob", "==", "Dani"), orderBy('timeStamp', 'desc'))
    const juninho = query(collection(db, "jobs"), where("responsavelJob", "==", "Juninho"), orderBy('timeStamp', 'desc'))
    const leandro = query(collection(db, "jobs"), where("responsavelJob", "==", "Leandro"), orderBy('timeStamp', 'desc'))
    const luiz = query(collection(db, "jobs"), where("responsavelJob", "==", "Luiz"), orderBy('timeStamp', 'desc'))
    const rafaela = query(collection(db, "jobs"), where("responsavelJob", "==", "Rafaela"), orderBy('timeStamp', 'desc'))
    const renan = query(collection(db, "jobs"), where("responsavelJob", "==", "Renan Lessa"), orderBy('timeStamp', 'desc'))
    const rodolfo = query(collection(db, "jobs"), where("responsavelJob", "==", "Rodolfo"), orderBy('timeStamp', 'desc'))
    const thiago = query(collection(db, "jobs"), where("responsavelJob", "==", "Thiago"), orderBy('timeStamp', 'desc'))
    const victoria = query(collection(db, "jobs"), where("responsavelJob", "==", "Victoria" || "Victória"), orderBy('timeStamp', 'desc'))

    const brunoSnapshot = await getDocs(bruno)
    const daniSnapshot = await getDocs(dani)
    const juninhoSnapshot = await getDocs(juninho)
    const leandroSnapshot = await getDocs(leandro)
    const luizSnapshot = await getDocs(luiz)
    const rafaelaSnapshot = await getDocs(rafaela)
    const renanSnapshot = await getDocs(renan)
    const rodolfoSnapshot = await getDocs(rodolfo)
    const thiagoSnapshot = await getDocs(thiago)
    const victoriaSnapshot = await getDocs(victoria)

    const brunoData = []
    const daniData = []
    const juninhoData = []
    const leandroData = []
    const luizData = []
    const rafaelaData = []
    const renanData = []
    const rodolfoData = []
    const thiagoData = []
    const victoriaData = []

    brunoSnapshot.forEach((doc) => {
      brunoData.push({ id: doc.id, ...doc.data() })
    })
    daniSnapshot.forEach((doc) => {
      daniData.push({ id: doc.id, ...doc.data() })
    })
    juninhoSnapshot.forEach((doc) => {
      juninhoData.push({ id: doc.id, ...doc.data() })
    })
    leandroSnapshot.forEach((doc) => {
      leandroData.push({ id: doc.id, ...doc.data() })
    })
    luizSnapshot.forEach((doc) => {
      luizData.push({ id: doc.id, ...doc.data() })
    })
    rafaelaSnapshot.forEach((doc) => {
      rafaelaData.push({ id: doc.id, ...doc.data() })
    })
    renanSnapshot.forEach((doc) => {
      renanData.push({ id: doc.id, ...doc.data() })
    })
    rodolfoSnapshot.forEach((doc) => {
      rodolfoData.push({ id: doc.id, ...doc.data() })
    })
    thiagoSnapshot.forEach((doc) => {
      thiagoData.push({ id: doc.id, ...doc.data() })
    })
    victoriaSnapshot.forEach((doc) => {
      victoriaData.push({ id: doc.id, ...doc.data() })
    })

    setJobs({
      bruno: brunoData, dani: daniData, juninho: juninhoData,
      leandro: leandroData, luiz: luizData, rafaela: rafaelaData,
      renan: renanData, rodolfo: rodolfoData, thiago: thiagoData,
      victoria: victoriaData,
    })

    mutate()

  }

  useEffect(() => {
    fetchData()
    mediaQuery()
    const intervalTable = setInterval(() => {
      fetchData()
      mediaQuery()
    }, 60000)

    return () => clearInterval(intervalTable)
  }, [])

  const mediaQuery = () => {
    if (innerWidth > 991) {
      return styles.tabelaContent
    } else if (innerWidth <= 991) {
      return { gridTemplateColumns: 'repeat(3, 1fr)' }
    } else if (innerWidth <= 700 && innerWidth > 500) {
      return { gridTemplateColumns: 'repeat(2, 1fr)' }
    } else if (innerWidth <= 500) {
      return { gridTemplateColumns: 'repeat(1, 1fr)' }
    } else {
      return ''
    }
  }

  return (
    <>
      <div style={mediaQuery()}>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Bruno</h3>
          {jobs.bruno.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Bruno' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Dani</h3>
          {jobs.dani.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Dani' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Juninho</h3>
          {jobs.juninho.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Juninho' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Leandro</h3>
          {jobs.leandro.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Leandro' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Luiz</h3>
          {jobs.luiz.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Luiz' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Rafaela</h3>
          {jobs.rafaela.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Rafaela' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Renan Lessa</h3>
          {jobs.renan.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Renan Lessa' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Rodolfo</h3>
          {jobs.rodolfo.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Rodolfo' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Thiago</h3>
          {jobs.thiago.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Thiago' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
        <div style={styles.tCard}>
          <h3 style={styles.cardTitulo}>Victoria</h3>
          {jobs.victoria.map((job, id) => (
            <ul key={id} style={styles.cardList}>
              {job.responsavelJob === 'Victoria' ? (
                <li style={styles.cardItem}>
                  {job.nomeDoJob}
                </li>
              ) : ''}
            </ul>
          ))}
        </div>
      </div>
    </>
  )
}