import React, { useEffect, useState } from "react";
import { director } from "../../lib/Director";
import { useTranslation } from "react-i18next";
import "./Users.css";
import { useParams } from "react-router-dom";

const Match = ({ username, playerWithMostWins }) => {
    const [userMatches, setUserMatches] = useState([]);
    const [userStats, setUserStats] = useState({ gamePlayed: 0, winRate: 0, gamesWon: 0 });
    const [opponentStats, setOpponentStats] = useState({});
    const [playerStats, setPlayerStats] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchMatches = async () => {
            const matchData = await director("game/user-matches/" + username);
            setUserMatches(matchData);
            calculateUserStats(matchData);
            calculateOpponentStats(matchData);
        };
        fetchMatches();
    }, [username]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            const players = await director("auth/get_users");
            setPlayerStats(players);
        };
        fetchPlayerStats();
    }, []);

    const calculateUserStats = (matches) => {
        let gamePlayed = matches.length;
        let gamesWon = 0;

        matches.forEach(match => {
            if ((match.score_player1 > match.score_player2 && match.player1 === username) ||
                (match.score_player2 > match.score_player1 && match.player2 === username)) {
                gamesWon++;
            }
        });

        const winRate = gamePlayed > 0 ? ((gamesWon / gamePlayed) * 100).toFixed(2) : 0;

        setUserStats({ gamePlayed, winRate, gamesWon });
    };

    const calculateOpponentStats = (matches) => {
        let opponentStats = {};

        matches.forEach(match => {
            const opponent = match.player1 === username ? match.player2 : match.player1;

            if (!opponentStats[opponent]) {
                opponentStats[opponent] = 1;
            } else {
                opponentStats[opponent]++;
            }
        });

        setOpponentStats(opponentStats);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        {t('user_matches')}
                    </div>
                    <div className="card-body">
                        {userMatches.map(match => (
                            <div key={match.id} className="mb-3">
                                <p className="mb-1">
                                    <strong>{t('score')} </strong> 
                                    <span className={match.score_player1 > match.score_player2 ? 'text-success' : 'text-danger'}>{match.score_player1}</span> - 
                                    <span className={match.score_player2 > match.score_player1 ? 'text-success' : 'text-danger'}>{match.score_player2}</span>
                                </p>
                                <p className="mb-1">
                                    <span className="text-primary"><a href={`${match.player1}`} className="text-decoration-none">{match.player1}</a></span> vs 
                                    <span className="text-primary"> <a href={`${match.player2}`} className="text-decoration-none">{match.player2 ? match.player2 : "anonyme"}</a></span> on {match.game_mode}
                                </p>
                                <p className="text-muted mb-0">{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(match.date_played))}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bg-success text-white">
                        {t('user_stats')}
                    </div>
                    <div className="card-body">
                        <p className="mb-3">{t('games_played')}: <span className="badge badge-secondary">{userStats.gamePlayed}</span></p>
                        <p className="mb-3">{t('games_won')}: <span className="badge badge-success">{userStats.gamesWon}</span></p>
                        <p className="mb-3">{t('win_rate')}: <span className="badge badge-info">{userStats.winRate}%</span></p>
                        <p className="mb-0">{t('games_against_player')}:</p>
                        <ul className="list-unstyled">
                            {Object.keys(opponentStats).map(opponent => (
                                <li key={opponent}>
                                    <span className="badge badge-info">{opponent}:</span>
                                    <span className="badge badge-info">{opponentStats[opponent]} </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bg-info text-white">
                        {t('connected_users')}
                    </div>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            {playerStats.map(player => (
                                <li key={player.id}>
                                    <a href={`/user/${player.username}`}>{player.username}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

function User() {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [winRate, setWinRate] = useState(0);
    const [playerWithMostWins, setPlayerWithMostWins] = useState("");
    const [playerStats, setPlayerStats] = useState([]);
    const [userRank, setUserRank] = useState(null);
    const [opponentStats, setOpponentStats] = useState({});

    const { t } = useTranslation();

    useEffect(() => {
        const obtenirUtilisateur = async () => {
            const data = await director("auth/get_user/" + username);
            setUser(data);
            calculerTauxVictoire(data);
        };
        obtenirUtilisateur();
    }, [username]);

    useEffect(() => {
        const obtenirJoueurAvecPlusDeVictoires = async () => {
            const joueurs = await director("auth/get_users");
            const maxVictoires = Math.max(...joueurs.map(joueur => joueur.games_won));
            const joueurAvecPlusDeVictoires = joueurs.find(joueur => joueur.games_won === maxVictoires);
            setPlayerWithMostWins(joueurAvecPlusDeVictoires.username);
        };
        obtenirJoueurAvecPlusDeVictoires();
    }, []);

    useEffect(() => {
        const obtenirStatsJoueurs = async () => {
            const joueurs = await director("auth/get_users");
            joueurs.sort((a, b) => b.games_won - a.games_won);
            setPlayerStats(joueurs);
        };
        obtenirStatsJoueurs();
    }, []);

    useEffect(() => {
        if (playerStats.length > 0) {
            const indexUtilisateur = playerStats.findIndex(joueur => joueur.username === username);
            setUserRank(indexUtilisateur + 1);
        }
    }, [playerStats, username]);

    const calculerTauxVictoire = (userData) => {
        if (userData.games_won || userData.games_lost) {
            const totalParties = userData.games_won + userData.games_lost;
            const taux = (userData.games_won / totalParties) * 100;
            setWinRate(taux.toFixed(2));
        }
    };

    return (
        <>
            <div className="profile">
                <div className="container-fluid">
                    <div className="user-header"></div>
                    <div className="row">
                        <div className="col-md-4 user-box ">
                            <div className="p-2 d-flex justify-content-between">
                                <span className="">{t('games_won')}</span>
                                <span className="">{user ? user.games_won : 0}</span>
                            </div>
                            <div className="p-2 d-flex justify-content-between">
                                <span className="">{t('games_lost')}</span>
                                <span className="">{user ? user.games_lost : 0}</span>
                            </div>
                            <div className="p-2 d-flex justify-content-between">
                                <span className="">{user.available ? t('available') : t('unavailable')}</span>
                            </div>
                            <div className="p-2 d-flex justify-content-between">
                                <span className="">{t('win_rate')}</span>
                                <span className="">{winRate}%</span>
                                <div className="win-rate-bar">
                                    <div className="win-rate-fill" style={{ width: `${winRate}%` }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-3">
                            <div className="bg-image-item profile-image rounded user-image" style={{ backgroundImage: "url(" + (user.profile_url ? "https://127.0.0.1:8080" + user.profile_url : "/marvin.png") + ")", margin: "5px"}}></div>
                            <div className="username" style={{ justifyContent: "center", fontWeight: "bold", textDecoration: "underline", color: "white" }}>{user.username}</div>
                            {userRank !== null && (
                                <div className="badge-container">
                                    {username === playerWithMostWins && 
                                        <div className="badge">Badge pour le joueur classé premier !</div>
                                    }
                                    <span className="ranking">Classement: {userRank}</span>
                                    {username === playerWithMostWins && 
                                        <img className="badge" src="../../../public/badge-removebg-preview.png" alt="Badge de joueur avec le plus de victoires" />
                                    }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="changelogs-list my-3">
                <Match username={username} playerWithMostWins={playerWithMostWins}></Match>
            </div>
        </>
    )
}

export default User;
