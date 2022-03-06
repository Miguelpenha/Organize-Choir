import { Icantor } from './types'
import path from 'path'
import fs from 'fs'
import { blueBright as info, greenBright as success } from 'chalk'

function makeMd(cantores: Icantor[], caminho: string, totalCantoresSend: number, totalCantoresNotSend: number) {
    let md = ''

    md += '# **<span style="color: #0872FC">Lista de cantores que enviaram</span>**\n'
    
    cantores.map(cantor => {
        if (cantor.vídeo && cantor.áudio) {
            md += `* **<span style="color: #0872FC;">${cantor.name} (${cantor.naipe})</span>**\n`
        }
    })

    md += `### **<span style="color: #0872FC">Total de pessoas que enviaram: ${totalCantoresSend}</span>**`

    md += '\n# **<span style="color: #ED3237">Lista de cantores que não enviaram</span>**\n'

    cantores.map(cantor => {
        if (!cantor.áudio && !cantor.vídeo) {
            md += `* **<span style="color: #ED3237;">${cantor.name} (${cantor.naipe})</span>**\n    * <span style="color: #ED3237;">Faltando vídeo</span>\n    * <span style="color: #ED3237;">Faltando áudio</span>\n`
        } else if (!cantor.vídeo) {
            md += `* **<span style="color: #ED3237;">${cantor.name} (${cantor.naipe})</span>**\n    * <span style="color: #ED3237;">Faltando vídeo</span>\n`
        } else if (!cantor.áudio) {
            md += `* **<span style="color: #ED3237;">${cantor.name} (${cantor.naipe})</span>**\n    * <span style="color: #ED3237;">Faltando áudio</span>\n`
        }
    })

    md += `### **<span style="color: #ED3237">Total de pessoas não que enviaram: ${totalCantoresNotSend}</span>**`
    
    const caminhoMd = path.resolve(caminho, 'Lista de cantores.md')

    fs.writeFileSync(caminhoMd, md)

    console.log(success(`${info('Lista de cantores.md')} gerada com sucesso! ${info(caminhoMd)}`))
}

export default makeMd