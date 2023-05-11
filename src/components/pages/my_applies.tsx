import React, { useEffect, useState } from 'react'
import LoggedTemplate from '../templates/logged'
import { FetchApplies, fetchAppliesService } from '../../services'
import MyAppliesList from '../molecules/my_applies_list'
import { useTranslation } from 'react-i18next'

export interface AppliesList {
  job: FetchApplies
  uuid: string
  title: string
  description: string
  tags: (string | false)[]
  tagsResume: (string | false)[]
  status: string
  dataCandidatura: string
}

const MyApplies: React.FC = () => {
  const [isFetching, setIsFetching] = useState(true)
  const [appliesList, setAppliesList] = useState<AppliesList[]>([])
  const accessToken = sessionStorage.getItem('accessToken')
  const { t } = useTranslation()

  useEffect(() => {
    const fetchFavoriteJobs = async () => {
      if (!accessToken) return

      const { response: jobs } = await fetchAppliesService(accessToken)

      const formmatedList = jobs.map((job) => {
        const cnh = job['habilitacao'] && t('organisms.jobs_list.car_license')
        const natacao = job['natacao'] && t('organisms.jobs_list.swim')
        const car = job['carro_exclusivo'] && t('organisms.jobs_list.car')
        const genero = job.genero === 'M' ? 'Masculino' : 'Feminino'
        const idiomas = job.idiomas.map((idioma) => idioma)

        const jobsTag = [
          `${job.quantidade_criancas} filhos`,
          genero,
          job.pais,
          job.religiao,
          cnh,
          natacao,
          car,
        ].concat(idiomas)

        const tagsResume = jobsTag.slice(0, 3)

        return {
          job: job,
          uuid: job['_id'],
          title: job.titulo_vaga,
          description: job.descricao,
          tags: jobsTag,
          tagsResume,
          status: job.candidatura.status,
          dataCandidatura: job.candidatura.data_candidatura,
        }
      })

      setAppliesList(formmatedList)
      setIsFetching(false)
    }

    fetchFavoriteJobs()
  }, [])

  return (
    <LoggedTemplate>
      <MyAppliesList
        appliesList={appliesList}
        perPage={10}
        isFetching={isFetching}
        setAppliesList={setAppliesList}
        setIsFetching={setIsFetching}
      />
    </LoggedTemplate>
  )
}

export default MyApplies
