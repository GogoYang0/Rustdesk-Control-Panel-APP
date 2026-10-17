import { render } from '@testing-library/react-native'

import App from './App'

// SafeAreaProvider 依赖原生布局回调，测试环境下用官方 mock 提供初始度量
jest.mock(
  'react-native-safe-area-context',
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  () => require('react-native-safe-area-context/jest/mock').default,
)

describe('App', () => {
  it('renders the product title', async () => {
    const { getByText } = await render(<App />)

    expect(getByText('Rustdesk-Control-Panel')).toBeTruthy()
  })
})
