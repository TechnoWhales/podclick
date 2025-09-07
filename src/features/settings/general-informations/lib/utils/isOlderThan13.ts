export const isOlderThan13 = (dateOfBirth: Date) => {
  const today = new Date()
  const age = today.getFullYear() - dateOfBirth.getFullYear()

  const hasBirthdayPassed =
    today.getMonth() > dateOfBirth.getMonth() ||
    (today.getMonth() === dateOfBirth.getMonth() && today.getDate() >= dateOfBirth.getDate())

  const realAge = hasBirthdayPassed ? age : age - 1

  return realAge >= 13
}
