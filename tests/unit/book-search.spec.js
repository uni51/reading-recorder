import { mount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Element from 'element-ui'
import BookSearch from '@/components/BookSearch.vue'

// Elementプラグインをインストール
const localVue = createLocalVue()	
localVue.use(Element)

describe('BookSearch.vue', () => {
  let $http;

  beforeEach(() => {
    // Promise<Response>オブジェクトを用意するモックを準備
    $http = () => Promise.resolve({
      // jsonメソッドを準備
      json: () => {
        return {
          totalItems: 5,
          items: [
            {
              id: 1,
              volumeInfo: {
                title: 'テスト1',
                authors: [ '山田太郎' ],
                publisher: 'WINGSプロジェクト',
                publishedDate: '2018-04-11',
                imageLinks: {
                  smallThumbnail: 'https://wings.msn.to/books/978-4-7981-5757-3/978-4-7981-5757-3.jpg'
                }
              },
              saleInfo: {
                listPrice: { amount: 1001 }
              }
            },
            {
              id: 2,
              volumeInfo: {
                title: 'テスト2',
                authors: [ '山田次郎' ],
                publisher: 'WINGSプロジェクト',
                publishedDate: '2018-04-12',
                imageLinks: {
                  smallThumbnail: 'https://wings.msn.to/books/978-4-7981-5757-3/978-4-7981-5757-3.jpg'
                }
              },
              saleInfo: {
                retailPrice: { amount: 1002 }
              }
            },
            {
              id: 3,
              volumeInfo: {
                title: 'テスト3',
                authors: [ '山田三郎' ],
                publisher: 'WINGSプロジェクト',
                publishedDate: '2018-04-13',
                imageLinks: {
                  smallThumbnail: 'https://wings.msn.to/books/978-4-7981-5757-3/978-4-7981-5757-3.jpg'
                }
              },
              saleInfo: {
                retailPrice: { amount: 1003 }
              }
            }
          ]
        }
      }
    })
  })

  it('fetch test', async () => {
    // book-searchコンポーネントをマウント
    const wrapper = mount(BookSearch, {
      // $httpプロパティにモックを設定
      mocks: {
        $http
      },
      localVue
    })
    // onclickメソッドを実行
    wrapper.vm.onclick()
    // 非同期処理の終了まで待機
    await flushPromises()
    // 取得した結果の一番目のtitleプロパティを精査
    expect(wrapper.vm.books[0].title).toBe('テスト1')
  })
})