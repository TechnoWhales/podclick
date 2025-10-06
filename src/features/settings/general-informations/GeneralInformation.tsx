'use client'
import { useEffect, useState } from 'react'

import { ProfileAvatar } from '@/features/profile/profile-avatar/ui/avatar/ProfileAvatar'
import {
  useGetProfileInformationQuery,
  useUploadProfileInformationMutation,
} from '@/features/settings/general-informations/api/generalInformationApi'
import { isOlderThan13 } from '@/features/settings/general-informations/lib/utils/isOlderThan13'
import { CircleLoading } from '@/shared/components/circle-loading/CircleLoading'
import { Button, Select, type SelectOption, TextField } from '@/shared/components/ui'
import { Datepicker, SelectType } from '@/shared/components/ui/datepicker/Datepicker'
import { useNameSchema, useUserNameSchema } from '@/shared/hooks'
import { notify } from '@/shared/lib/notify'
import { ProfileInformationType } from '@/shared/types'
import { handleError } from '@/shared/utils/handleError'

import s from './GeneralInformation.module.scss'

const countryOptions: SelectOption[] = [
  {
    value: 'Belarus',
    label: <span>Belarus</span>,
  },
  {
    value: 'Russia',
    label: <span>Russia</span>,
  },
  {
    value: 'Ukraine',
    label: <span>Ukraine</span>,
  },
  {
    value: 'Italy',
    label: <span>Italy</span>,
  },
  {
    value: 'Australia',
    label: <span>Australia</span>,
  },
]

const cityOptions: SelectOption[] = [
  {
    value: 'Minsk',
    label: <span>Minsk</span>,
  },
  {
    value: 'Moscow',
    label: <span>Moscow</span>,
  },
  {
    value: 'Kiev',
    label: <span>Kiev</span>,
  },
  {
    value: 'Rome',
    label: <span>Rome</span>,
  },
  {
    value: 'Sydney',
    label: <span>Sydney</span>,
  },
]

export const GeneralInformation = () => {
  const [showSpinner, setShowSpinner] = useState(true)
  const [userName, setUserName] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [firstName, setFirstName] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastName, setLastName] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [aboutMe, setAboutMe] = useState('')
  const [textFieldError, setTextFieldError] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date())
  const [dateOfBirthError, setDateOfBirthError] = useState('')
  const [country, setCountry] = useState(countryOptions[0].value)
  const [city, setCity] = useState(cityOptions[0].value)
  const [disabledBtn, setDisabledBtn] = useState(true)

  const [uploadProfileInformation] = useUploadProfileInformationMutation()
  const { data, isLoading, refetch } = useGetProfileInformationQuery()
  const avatars = data?.avatars || []
  const userNameSchema = useUserNameSchema()
  const nameSchema = useNameSchema()

  useEffect(() => {
    if (
      userName &&
      !userNameError &&
      firstName &&
      !firstNameError &&
      lastName &&
      !lastNameError &&
      isOlderThan13(dateOfBirth)
    ) {
      setDisabledBtn(false)

      return
    }
    setDisabledBtn(true)
  }, [userName, firstName, lastName])

  useEffect(() => {
    if (data) {
      const { aboutMe, city, country, userName, dateOfBirth, lastName, firstName } = data
      const date = new Date(dateOfBirth)

      setUserName(userName)
      setFirstName(firstName || '')
      setLastName(lastName || '')
      setCountry(country)
      setCity(city)
      setDateOfBirth(date)
      setAboutMe(aboutMe || '')
      setShowSpinner(false)
    }
  }, [isLoading])

  const setDateHandler = (date: SelectType) => {
    if (date.date && !Array.isArray(date.date)) {
      setDateOfBirth(date.date)
      if (!isOlderThan13(date.date)) {
        setDateOfBirthError('A user under 13 cannot create a profile.')
      } else {
        setDateOfBirthError('')
      }
    }
  }

  const setAboutMeHandler = (value: string) => {
    if (aboutMe.length >= 200) {
      setTextFieldError('Не более 200 символов')

      return
    }

    setTextFieldError('')
    setAboutMe(value)
  }

  const setUserNameHandler = (userName: string) => {
    const { error } = userNameSchema.safeParse({ userName })

    setUserName(userName)
    if (error?.issues[0]?.message) {
      setUserNameError(error.issues[0].message)
    } else {
      setUserNameError('')
    }
  }
  const setFirstNameHandler = (firstName: string) => {
    const { error } = nameSchema.safeParse({ name: firstName })

    setFirstName(firstName)
    if (error?.issues[0]?.message) {
      setFirstNameError(error.issues[0].message)
    } else {
      setFirstNameError('')
    }
  }
  const setLastNameHandler = (lastName: string) => {
    const { error } = nameSchema.safeParse({ name: lastName })

    setLastName(lastName)
    if (error?.issues[0]?.message) {
      setLastNameError(error.issues[0].message)
    } else {
      setLastNameError('')
    }
  }

  const uploadProfileInformationHandler = async () => {
    try {
      const body: ProfileInformationType = {
        firstName,
        lastName,
        aboutMe,
        city,
        country,
        userName,
        dateOfBirth,
        region: 'silicon valley',
      }

      await uploadProfileInformation(body)
      refetch()
      notify.success('Your settings are saved!')
    } catch (e) {
      handleError(e)
      notify.error('Error! Server is not available!')
    }
  }

  if (showSpinner) {
    return <CircleLoading />
  }

  return (
    <div className={s.container}>
      <ProfileAvatar avatars={avatars} />
      <div className={s.editProfile}>
        <TextField
          margin={'0 0 24px'}
          value={userName}
          onChange={e => setUserNameHandler(e.currentTarget.value)}
          className={s.textfiled}
          label={'Username'}
          fullWidth
          error={userNameError}
        />
        <TextField
          value={firstName}
          onChange={e => setFirstNameHandler(e.currentTarget.value)}
          className={s.textfiled}
          label={'First Name'}
          fullWidth
          error={firstNameError}
        />
        <TextField
          value={lastName}
          onChange={e => setLastNameHandler(e.currentTarget.value)}
          className={s.textfiled}
          label={'Last Name'}
          fullWidth
          error={lastNameError}
        />
        <Datepicker
          startDate={dateOfBirth}
          onSelect={setDateHandler}
          fullWidth
          error={dateOfBirthError}
        />
        <div className={s.selectsContainer}>
          <Select
            className={s.select}
            value={country}
            onValueChange={newValue => setCountry(newValue)}
            options={countryOptions}
            size={'m'}
            label={'Select your country'}
          />
          <Select
            className={s.select}
            value={city}
            onValueChange={newValue => setCity(newValue)}
            options={cityOptions}
            size={'m'}
            label={'Select your city'}
          />
        </div>
        <TextField
          value={aboutMe}
          onChange={e => setAboutMeHandler(e.currentTarget.value)}
          error={textFieldError}
          rows={3}
          label={'About Me'}
          placeholder={'Text-area'}
          fullWidth
          multiline
        />
        <Button
          disabled={disabledBtn}
          className={s.saveBtn}
          onClick={uploadProfileInformationHandler}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
