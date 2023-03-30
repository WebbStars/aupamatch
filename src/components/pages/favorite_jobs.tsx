import React, { useEffect, useState } from 'react'
import LoggedTemplate from '../templates/logged'
import FavoriteJobsList from '../molecules/favorite_jobs_list'
import { FetchAupairJobState, getFavoriteJobs } from '../../services'
import { useTranslation } from 'react-i18next'

interface JobsList {
  job: FetchAupairJobState
  uuid: string
  title: string
  description: string
  tags: (string | false)[]
  tagsResume: (string | false)[]
}

const FavoriteJobs: React.FC = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [jobsList, setJobsList] = useState<JobsList[]>([])
  const { t } = useTranslation()

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      const accessToken = sessionStorage.getItem('accessToken')

      const { response: jobs } = await getFavoriteJobs(accessToken!)

      const formmatedList = jobs.map((job) => {
        const cnh = job['habilitacao'] && t('organisms.jobs_list.car_license')
        const natacao = job['natacao'] && t('organisms.jobs_list.swim')
        const car = job['carro_exclusivo'] && t('organisms.jobs_list.car')
        const genero = job.genero === 'M' ? 'Masculino' : 'Feminino'

        const jobsTag = [
          `${job.quantidade_criancas} filhos`,
          genero,
          job.pais,
          job.idioma,
          job.religiao,
          cnh,
          natacao,
          car,
        ]
        const tagsResume = jobsTag.slice(0, 3)

        return {
          job: job,
          uuid: job['_id'],
          title: job.titulo_vaga,
          description: job.descricao,
          tags: jobsTag,
          tagsResume,
        }
      })

      setJobsList(formmatedList)
      setIsFetching(false)
    }

    fetchFavoriteJobs()
  }, [])

  return (
    <LoggedTemplate>
      <FavoriteJobsList
        jobsList={jobsList}
        perPage={10}
        isFetching={isFetching}
      />
    </LoggedTemplate>
  )
}

export default FavoriteJobs
