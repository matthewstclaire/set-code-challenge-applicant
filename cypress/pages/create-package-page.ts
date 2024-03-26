export default class CreatePackagePage {
  get saveButton() {
    return cy.get('[data-testid=save-package-button]')
  }

  clickInstallStepButton() {
    cy.get('[data-testid=install-step-button]').click()
  }

  clickAddPowershellStepButton() {
    cy.get('[data-testid=add-step-buttons-expand-arrow]').click()
    cy.get('[data-testid=script-step-button]').click()
  }

  get nameEntry() {
    return cy.get('[data-testid="name-entry"]')
  }

  get versionEntry() {
    return cy.get('[data-testid="version-entry"]')
  }

  get descriptionEntry() {
    return cy.get('[data-testid="description-entry"]')
  }

  get timeoutEntry() {
    return cy.get('[data-testid="timeout-entry"]')
  }

  get stepNameEntry() {
    return cy.get('[data-testid="step-name-entry"]')
  }

  get stepSuccessCodesEntry() {
    return cy.get('[data-testid="success-codes-entry"]')
  }

  get stepParametersEntry() {
    return cy.get('[data-testid="parameters-entry"]')
  }

  get powershellUpload() {
    return cy.contains('Import .ps1')
  }

  get installerUpload() {
    return cy.get('[data-testid="installer-upload"]')
  }

  get vertIcon() {
    return cy.get('[data-testid="MoreVertIcon"]')
  }

  additionalFileUpload() {
    return cy.get('[data-testid="attach-file"]')
  }

  fillPackageInfo(
    customPackageName: string,
    customPackageDescription: string,
    customPackageVersion: string,
    customPackageTimeout: string
  ) {
    this.nameEntry.click().clear().type(customPackageName)
    this.descriptionEntry.click().clear().type(customPackageDescription)
    this.versionEntry.click().clear().type(customPackageVersion)
    this.timeoutEntry.click().clear().type(customPackageTimeout)
  }

  createPackageStep(
    file: string,
    exitcodes: string,
    parameter: string,
    isPowershell?: boolean
  ) {
    if (isPowershell) {
      this.clickAddPowershellStepButton()
    } else {
      this.clickInstallStepButton()
    }
    this.stepNameEntry.click().clear().type('run hello world')
    this.stepParametersEntry.click().clear().type(parameter)
    this.stepSuccessCodesEntry.click().clear().type(exitcodes)
    if (isPowershell) {
      this.powershellUpload.selectFile(file, { force: true })
    } else {
      this.installerUpload.selectFile(file, { force: true })
    }
    this.additionalFileUpload().selectFile(
      './cypress/resources/additional-file.txt',
      { force: true }
    )
    cy.waitUntil(this.isDoneUploading)
  }

  isDoneUploading(): boolean {
    return Cypress.$('*[class^="MuiCircularProgress-svg"]').length < 1
  }

  verifyPackage(customPackageName: string,
    customPackageDescription: string,
    customPackageVersion: string,
    customPackageTimeout: string){
      this.nameEntry.find('input').invoke('val').should('contain', customPackageName);
      this.descriptionEntry.find('textarea').invoke('val').should('contain', customPackageDescription);
      this.versionEntry.find('input').invoke('val').should('contain', customPackageVersion);
      this.timeoutEntry.find('input').invoke('val').should('contain', customPackageTimeout);
  }

  deletePackage(){
  this.vertIcon.click()
  cy.contains('Delete package').click()
  cy.get('button').contains('Delete').click()
  }
}
