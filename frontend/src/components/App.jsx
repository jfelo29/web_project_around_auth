import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./footer/Footer.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfile from "./form/EditProfile/EditProfile.jsx";
import EditAvatar from "./form/EditAvatar/EditAvatar.jsx";
import NewCard from "./form/NewCard/NewCard.jsx";
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { InfoTooltip } from './InfoTooltip.jsx';
import { signup, signin, GetInfo } from '../utils/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { setToken, getToken, removeToken } from '../utils/token';
function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCard] = useState([]);
  const [jwt, setJwt] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile
        handleUpdateUser={handleUpdateUser}
        handleOpenPopupEditProfile={handleOpenPopupEditProfile}
      />
    ),
  };
  const editAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar handleUpdateAvatar={handleUpdateAvatar} />,
  };
  const newCardPopup = {
    title: "Crear nueva tarjeta",
    children: (
      <NewCard
        onAddPlaceSubmit={handleAddPlaceSubmit}
        handleOpenPopupNewCard={handleOpenPopupNewCard}
      />
    ),
  };

  useEffect(() => {

    if (!jwt) {
      return;

    }
    api.getUserInfo().then((data) => {
      setCurrentUser(data);
      setIsLoggedIn(true);
      GetInfo().then((data) => {
        setCurrentUser((state) => ({ ...state, ...data.data }));

        navigate('/');
      })


    }).catch((err) => {
      console.log(err);
    });
    //getUserInfo();

  }, [jwt, isLoggedIn]);
  console.log(currentUser);
  /*function getUserInfo() {
    
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }*/
  function handleOpenPopupNewCard() {
    setPopup(newCardPopup);
  }
  function handleOpenPopupEditProfile() {
    setPopup(editProfilePopup);
  }
  function handleOpenPopupEditAvatar() {
    setPopup(editAvatarPopup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  async function handleUpdateUser(data) {
    await api.editUser(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }
  async function handleUpdateAvatar(data) {
    await api.profileImage(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
    });
  }
  async function handleAddPlaceSubmit(data) {
    await api.createcard(data).then((newData) => {
      setCard([newData, ...cards]);
      handleClosePopup();
    });
  }
  async function handleSignin(data) {
    signin(data).then((newData) => {
      if (data.jwt) {
        setToken(data.jwt);

        setIsLoggedIn(true);
        setIsInfoTooltip(true);
        navigate('/');
        setJwt(data.jwt);


        const redirectPath = location.state?.from?.pathname || "/login";
        navigate(redirectPath);
      }

      handleClosePopup();
      navigate('/');
    }).catch((err) => {
      setIsInfoTooltip(true);
    });
  }

  async function handleSignout() {
    removeToken();
    setIsLoggedIn(false);
    const redirectPath = location.state?.from?.pathname || "/login";
    navigate(redirectPath);
    setCurrentUser({});
    setJwt(null);


  }
  async function handleSignup(data) {
    signup(data).then((newData) => {
      setCurrentUser(newData);
      handleClosePopup();
      navigate('/login');
    }).catch((err) => {
      console.log(err);
    });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header handleSignout={handleSignout} />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute isloggedIn={isLoggedIn}>

              <Main
                setCurrentUser={setCurrentUser}
                onHandleUpdateUser={handleUpdateUser}
                onHandleUpdateAvatar={handleUpdateAvatar}
                handleOpenPopupEditAvatar={handleOpenPopupEditAvatar}
                handleOpenPopupEditProfile={handleOpenPopupEditProfile}
                handleOpenPopupNewCard={handleOpenPopupNewCard}
                handleClosePopup={handleClosePopup}
                handleAddPlaceSubmit={handleAddPlaceSubmit}
                popup={popup}
                cards={cards}
                setCard={setCard} />
            </ProtectedRoute>} />
          <Route path="/login" element={<Login signin={handleSignin} />} />

          <Route path="/register" element={<Register signup={handleSignup} />} />

        </Routes>
        {isInfoTooltip && <InfoTooltip isOpen={isInfoTooltip}
          onclose={handleClosePopup}
          isSuccess={isRegistrationSuccess}>
        </InfoTooltip>}

        <Footer />

      </div>

    </CurrentUserContext.Provider>

  );
}



export default App;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JiYjM2NWFkMzkzMDRhZjI4NjkzNGQiLCJpYXQiOjE3NDAzNTQ0NTQsImV4cCI6MTc0MDk1OTI1NH0.eGpAjLITAIEUA1AfirfTp7zQ-oyje3q3fEYR1sOUJXQ"
/* email
:
"juan@correo.com"
password
:
"123234" */
// cuando no tenga token tendria que hacer redirigirme a login 
// TENGO QUE HACER NULL QUE PASE LAS TARJETAS SI NO ESTA INCIADA LA SESION
// igual el nombre de usuario 