import { IcreatedFolders } from './types'
import createFolderNaipe from './createFolderNaipe'
import createFoldersCantores from './createFoldersCantores'

function createFolders(naipe: string, cantores: string[] | null): IcreatedFolders[] {
    if (cantores) {
        const createdFolders: IcreatedFolders[] = [
            ...createFolderNaipe(naipe),
            ...createFoldersCantores(cantores, naipe)
        ]

        return createdFolders
    } else {
        return []
    }
}

export default createFolders