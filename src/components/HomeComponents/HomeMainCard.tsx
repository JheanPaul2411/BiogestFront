import { CardOferta } from './CardOferta'
import './HomeMainCard.css'
export default function HomeMainCard() {

    const ofertas = [
        {
            titulo: "Consulta prenatal integral",
            descripcion: "Nuestro equipo de obstetras altamente calificados proporciona un seguimiento completo durante el embarazo. Desde exámenes de rutina hasta pruebas de diagnóstico avanzadas, estamos comprometidos a brindar atención médica de calidad para garantizar la salud tanto de la madre como del bebé.",
            imagen: "https://elcomercio.pe/resizer/RXohn8e4f-vQfPgYhqaDechKWnc=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/VQWWKIGWSRCZJKR3AX6WSVJN2Q.jpg"
        },
        {
            titulo: "Clases de preparación para el parto",
            descripcion: "Ofrecemos clases especializadas para futuros padres, diseñadas para prepararlos física y emocionalmente para el parto. Desde técnicas de respiración hasta consejos para el cuidado del recién nacido, nuestras clases ayudan a reducir la ansiedad y fomentan una experiencia de parto más positiva.",
            imagen: "https://inatal.org/images/embarazo/parto/preparto86534032.jpg"

        },
        {
            titulo: "Ecografía obstétrica 4D",
            descripcion: "Experimente la emoción de ver a su bebé en detalle con nuestras ecografías obstétricas 4D. Utilizando tecnología de vanguardia, capturamos imágenes nítidas y realistas que le permiten conectarse con su pequeño antes de que nazca. Una experiencia inolvidable para cualquier futura familia.",
            imagen: "https://www.tucanaldesalud.es/es/voz-especialista/ecografia-4d.ficheros/235312-4d_1trim_ampli.jpg"
        },
        {
            titulo: "Asesoramiento genético prenatal:",
            descripcion: " Nuestros consejeros genéticos especializados ofrecen orientación y pruebas para evaluar el riesgo de anomalías genéticas en su bebé. Con un enfoque compasivo y basado en evidencia, trabajamos junto a usted para tomar decisiones informadas sobre la salud de su familia.",
            imagen: "https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/temas/consulta-genetica-prenatal_1.jpg"

        }
    ];

    return (
        <div className="h-fit w-full flex flex-col items-center my-10">

            <section id={"main-home"} className='p-5 w-[100%] sm:w-[90%]
           flex items-center justify-center rounded-md'>
                <h1 className='z-10 font-semibold text-4xl text-center text-white'>Somos el mejor consultorio médico de Quito</h1>
            </section>

                <section className='p-5 m-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {ofertas.map((oferta, i) => {
                    return (
                        <CardOferta key={i} titulo={oferta.titulo} descripcion={oferta.descripcion} imagen={oferta.imagen}></CardOferta>
                    )
                })}
            </section>

        </div>

    )
}