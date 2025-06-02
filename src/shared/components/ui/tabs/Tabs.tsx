import * as TabsPrimitive from '@radix-ui/react-tabs'

import s from './Tabs.module.scss'

const Tabs = () => (
  <TabsPrimitive.Root className={s.Root} defaultValue={'tab1'}>
    <TabsPrimitive.List className={s.List} aria-label={'Manage your account'}>
      <TabsPrimitive.Trigger className={s.Trigger} value={'tab1'}>
        Account
      </TabsPrimitive.Trigger>
      <TabsPrimitive.Trigger className={s.Trigger} value={'tab2'}>
        Password
      </TabsPrimitive.Trigger>
    </TabsPrimitive.List>
  </TabsPrimitive.Root>
)

export default Tabs
