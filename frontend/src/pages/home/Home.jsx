import Block from "../../components/block/Block"
import Button from "../../components/button/Button"
import "./Home.css"
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { director } from "../../lib/Director";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";


function Home() {
    const [data, setData] = useState("?");
    const [config, setConfig] = useState({ speed: 3, points: 5, ia: 0 });
    const [room, setRoom] = useState("");
    const {t} = useTranslation();


    const navigate = useNavigate();


    const deepthought = async () => {
        let data = await director("deepthought/answer")
        setData(data.answer);
    }

    function playLocalMatch() {
        navigate('/local', {"state": config});
    }

    function joinRoom() {
        navigate(`/online/${room ? room : "42"}`);
    }
    
    return (
        <>
        <Profile></Profile>
        <div className="container-fluid">
            <div className="row">
                <Block title={t("deep_tought")}>
                    <div className="text-center">
                        <Button href="" onClick={deepthought}>{t("answer")}</Button>
                        <p className="mt-3">{t("answer_of_life")} : {data}</p>
                    </div>
                </Block>

                <Block title={t("play_local")}>
                    <div className="text-center">
                    <div className="d-flex justify-content-between align-items-center">
                            <label className="">{t("ia")}</label>
                            <div>
                                <input onChange={e =>  setConfig(prevState => ({...prevState, ["ia"]:  parseInt(e.target.value)}))} min="0" max="4" defaultValue="0" className="config-number" type="number"></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="">{t("points")}</label>
                            <div>
                                <input onChange={e =>  setConfig(prevState => ({...prevState, ["points"]:  parseInt(e.target.value)}))} min="3" max="39" defaultValue="5" className="config-number" type="number"></input>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="">{t("game_speed")}</label>
                            <div>
                                <input onChange={e =>  setConfig(prevState => ({...prevState, ["speed"]: parseInt(e.target.value)}))} min="1" max="5" defaultValue="3" className="config-number" type="number"></input>
                            </div>
                        </div>
                        <Button onClick={playLocalMatch}>
                            {t("play")}
                        </Button>
                    </div>
                </Block>

                <Block title={t("tournament")}>
                    <div className="text-center">
                        <Button>
                            <Link to={'tournament/'}>{t("tournament")}</Link>
                        </Button>
                    </div>
                </Block>

                <Block title={t("play_multiplayer")}>
                    <div className="text-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <label className="">{t("game_room")}</label>
                            <div>
                                <input onChange={e =>  setRoom(e.target.value)} className="config-input" type="text"></input>
                            </div>
                        </div>
                        <div className="py-3">
                            <Button className="mx-2" onClick={joinRoom}>
                                {t("join")}
                            </Button>
                        </div>
                    </div>
                </Block>
                
            </div>
        </div></>
    )
}

export default Home