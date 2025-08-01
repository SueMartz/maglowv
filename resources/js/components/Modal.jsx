import React from 'react'
import './Modal.css'

const Modal = ({ datamodal, close }) => {
    const openLink = (url) => {
        window.open(url, '_blank', 'noreferrer')
    }

    return (
        <div className='modal_bg'>
            <div className="modal_content">
                <div className="modal_body">
                    <img src={'/img/producto/' + datamodal.image} width={150} height={150} className='mx-auto d-block rounded-pill p-2 shadow' />
                    <h1 className='text-center'>{datamodal.name}</h1>
                    <p>{datamodal.description}</p>
                    <ul className='list-group'>
                        <li className='list-group-item'>Precio:   <b> {new Intl.NumberFormat('es-MX', {
                            style: 'currency',
                            currency: 'MXN'
                        }).format(datamodal.price)}</b></li>
                        <li className='list-group-item'>Codigo:   <b>{datamodal.code}</b></li>
                        <li className='list-group-item'>Detalles: <b>{datamodal.details}</b></li>
                    </ul>


                </div>
                <div className="modal_footer">
                    <button onClick={() => close(false)} className='btn btn-primary btn mt-3'>Regresar</button>
                </div>

            </div>
        </div>
    )
}

export default Modal
