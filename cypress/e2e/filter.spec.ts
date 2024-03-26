import DeployMenu from '../pages/deploy-menu.page'
import DevicesListPage from '../pages/devices-list.page'
import FilterModal from '../pages/filter-modal'
import DeviceInfo from '../utils/device-info'

const devicesListPage = new DevicesListPage()
const filterModal = new FilterModal()
describe('filter', () => {
  let deviceInfo: DeviceInfo

  beforeEach(() => {
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.resetDemoData()
  })

  it('Can create a filter', () => {
   // Using the test data I was unable to find data using Edge as the software. I altered this to still be able to test filter functionality, but reliant upon the dummy data provided
    devicesListPage.load()
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Device', 'Name', 'contains', '5')
    filterModal.applyFilter()
    devicesListPage.filterDummyData()
  })

  it('Can save a group', () => {
    let groupName = 'is dummy 5'
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Device', 'Name', 'contains', '5')
    filterModal.saveGroup(groupName)
    devicesListPage.getGroupTab(groupName)
    devicesListPage.filterDummyData()
    devicesListPage.getGroupTabCount('is dummy 5').should('contain', 1)
    devicesListPage.getGroupTab('All devices').click()
    devicesListPage.verifyAllDummyData()
  })
})
