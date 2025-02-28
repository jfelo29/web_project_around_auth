
import Popup from "./Main/popup/Popup.jsx";


export function InfoTooltip({ isOpen, onClose, isSuccess }) {

    return (
        <Popup
            isOpen={isOpen}
            onClose={onClose}
            name="infoTooltip"
            title={
                isSuccess
                    ? "¡Correcto! Ya estás registrado."
                    : "Uy, algo salió mal. Por favor, inténtalo de nuevo."
            }
            showText={false}
            showButton={false}
        >
            {
                isSuccess
                    ? (
                        <img className="" src="" alt="" />
                    ) : (
                        <img className="" src="" alt="" />
                    )
            }
            <h2 className="popup__title">
                {isSuccess
                    ? "¡Correcto! Ya estás registrado."
                    : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
            </h2>
            <p className="popup__text">
                {isSuccess
                    ? "¡Correcto! Ya estás registrado."
                    : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
            </p>
        </Popup >
    );
}

