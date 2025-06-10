import { TabContent, Tabs } from '@/shared/components/ui/tabs/Tabs'
import { Meta } from '@storybook/react'

export default {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    tabs: [
      { value: 'sport', title: 'Спорт' },
      { value: 'metro', title: 'Метро' },
      { value: 'most', title: 'Мост' },
    ],
    defaultValue: 'sprints',
    children: (
      <>
        <TabContent value={'sport'}>какой то контент </TabContent>
        <TabContent value={'metro'}>какойто контент</TabContent>
        <TabContent value={'most'}>контент</TabContent>
      </>
    ),
  },
} as Meta<typeof Tabs>

export const PrimaryWithDisabled = {
  args: {
    tabs: [
      { value: 'sport', title: 'Спорт' },
      { value: 'metro', title: 'Метро' },
      { value: 'most', title: 'Мост', disabled: true },
    ],
  },
}

export const FullWidth = {
  args: {
    fullWidth: true,
  },
}

export const Secondary = {
  args: {
    variant: 'secondary',
  },
}

export const SecondaryWithDisabled = {
  args: {
    ...Secondary.args,
    tabs: [
      { value: 'sport', title: 'Спорт' },
      { value: 'metro', title: 'Метро' },
      { value: 'most', title: 'Мост', disabled: true },
    ],
  },
}
