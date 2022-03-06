import { Icantor } from './types'
import { Paragraph, TextRun, Document, HeadingLevel, AlignmentType, Packer } from 'docx'
import path from 'path'
import fs from 'fs'
import { blueBright as info, greenBright as success } from 'chalk'

async function makeDocx(cantores: Icantor[], caminho: string, totalCantoresSend: number, totalCantoresNotSend: number) {
    const paragraphsCantoresSend = []
    const paragraphsCantoresNotSend = []

    cantores.map(cantor => {
        if (cantor.vídeo && cantor.áudio) {
            paragraphsCantoresSend.push(
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: `${cantor.name} (${cantor.naipe})`,
                            font: 'Arial',
                            size: 24,
                            color: '#0872FC',
                            bold: true
                        })
                    ]
                })
            )
        } else {
            paragraphsCantoresNotSend.push(
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: `${cantor.name} (${cantor.naipe})`,
                            font: 'Arial',
                            size: 24,
                            color: '#ED3237',
                            bold: true
                        })
                    ]
                })
            )
            if (!cantor.vídeo) {
                paragraphsCantoresNotSend.push(
                    new Paragraph({
                        bullet: {
                            level: 1
                        },
                        children: [
                            new TextRun({
                                text: 'Faltando vídeo',
                                font: 'Arial',
                                size: 24,
                                color: '#ED3237'
                            })
                        ]
                    })
                )
            }
            
            if (!cantor.áudio) {
                paragraphsCantoresNotSend.push(
                    new Paragraph({
                        bullet: {
                            level: 1
                        },
                        children: [
                            new TextRun({
                                text: 'Faltando áudio',
                                font: 'Arial',
                                size: 24,
                                color: '#ED3237'
                            })
                        ]
                    })
                )
            }
        }
    })

    const document = new Document({
        title: 'Lista de cantores',
        sections: [{
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'Lista de cantores que já enviaram',
                            font: 'Arial',
                            size: 36,
                            bold: true,
                            color: '#0872FC'
                        })
                    ],
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({}),
                ...paragraphsCantoresSend,
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Total de pessoas que enviaram: ${totalCantoresSend}`,
                            font: 'Arial',
                            size: 30,
                            bold: true,
                            color: '#0872FC'
                        })
                    ],
                    heading: HeadingLevel.HEADING_3,
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({}),
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: 'Lista de cantores que não enviaram',
                            font: 'Arial',
                            size: 36,
                            bold: true,
                            color: '#ED3237'
                        })
                    ],
                    heading: HeadingLevel.TITLE,
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({}),
                ...paragraphsCantoresNotSend,
                new Paragraph({}),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Total de pessoas que não enviaram: ${totalCantoresNotSend}`,
                            font: 'Arial',
                            size: 30,
                            bold: true,
                            color: '#ED3237'
                        })
                    ],
                    heading: HeadingLevel.HEADING_3,
                    alignment: AlignmentType.CENTER
                }),
            ]
        }]
    })

    const docx = await Packer.toBuffer(document)

    const caminhoDocx = path.resolve(caminho, 'Lista de cantores.docx')

    fs.writeFileSync(caminhoDocx, docx)
    
    console.log(success(`${info('Lista de cantores.docx')} gerada com sucesso! ${info(caminhoDocx)}`))
}

export default makeDocx