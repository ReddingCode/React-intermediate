// import { formatJobList, formatQueryParams } from "./"

import { screen, waitForElementToBeRemoved } from "@testing-library/react"
import Results from "."
import { render } from "../../utils/test"
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from "msw/lib/node"
import { rest } from "msw"

// describe('La fonction formatJobList', () => {
//     test('Ceci est mon premier test', () => {
//         const expectedState = 'item2'
//         expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
//     })
//     test('Ne met pas de virgule pour le derniere element', () => {
//         const expectedState = 'item3'
//         expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
//     })
// })

// Jusqu'à maintenant, vous avez utilisé "test" pour écrire vos tests. Mais il existe un alias pour cette fonction : it()  

// Comme pour tout, il existe des conventions de rédaction de tests pour que les appellations
//  soient les plus explicites possibles. Une des conventions possibles consiste à commencer 
//  tous les tests par "should". Dans ce cas, c'est encore plus explicite d'utiliser l'alias it 
//   dont je viens de vous parler. Ce qui aurait donné dans notre cas

// describe('The formatJobList function', () => {
//     it('should add a comma to a word', () => {
//         const expectedState = 'item2,'
//         expect(formatJobList('item2', 3, 1)).toEqual(expectedState)
//     })
 
//     it('should not add a comma to the last element of the list', () => {
//         const expectedState = 'item3'
//         expect(formatJobList('item3', 3, 2)).toEqual(expectedState)
//     })
// })

// describe('The fonction formatQueryParams', () => {
//     it('Should use the right format param', () => {
//         const expectedState = 'a1=answer1'
//         expect(formatQueryParams({ 1 : 'answer1' })).toEqual(expectedState)
//     })
//     it('Should concatenate params with an &', () => {
//         const expectedState = 'a1=answer1&a2=answer2'
//         expect(formatQueryParams({ 1 : 'answer1', 2 : 'answer2' })).toEqual(expectedState)
//     })
// })

const resultsMockedData = [
    {
      title: 'seo',
      description: `Le SEO est en charge du référencement web d'une page`,
    },
    {
      title: 'frontend',
      description: `Le développeur ou la développeuse frontend se charge de l'interface : interactions avec l'utilisateur, style, etc.`,
    },
  ]
  
  const server = setupServer(
    rest.get('http://localhost:8000/results', (req, res, ctx) => {
      return res(ctx.json({ resultsData: resultsMockedData }))
    })
  )
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  
  describe('The Results component', () => {
    test('should display the results after the data is loaded', async () => {
      render(<Results />)
      await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
      const jobTitleElements = screen.getAllByTestId('job-title')
      expect(jobTitleElements[0].textContent).toBe('seo')
      expect(jobTitleElements.length).toBe(2)
      const jobDescriptionElements = screen.getAllByTestId('job-description')
      expect(jobDescriptionElements[1].textContent).toBe(
        resultsMockedData[1].description
      )
      expect(jobDescriptionElements.length).toBe(2)
    })
  })