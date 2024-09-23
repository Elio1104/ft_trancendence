import React, { useEffect, useState } from "react";
import { director } from "../../lib/Director";
import Block from "../../components/block/Block";
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const WinRateGauge = () => {
    const [playerStats, setPlayerStats] = useState([]);
    const [dropState, setDropState] = useState("WinRate");
    const [maxGames, setMaxGames] = useState(0);
    const [maxWins, setMaxWins] = useState(0);
    const { t } = useTranslation();

    useEffect(() => {
        const getPlayerStats = async () => {
            try {
                const playersData = await director("auth/get_users");
    
                const maxStats = playersData.reduce((acc, player) => {
                    if (player.games_won > acc.maxWins) {
                        acc.maxWins = player.games_won;
                    }
                    if ((player.games_lost + player.games_won) > acc.maxGames) {
                        acc.maxGames = player.games_lost + player.games_won;
                    }
                    return acc;
                }, { maxWins: 0, maxGames: 0 });
    
                const playerStatsData = playersData.map(player => ({
                    name: player.username,
                    gamesPlayed: player.games_won + player.games_lost,
                    gamesWon: player.games_won,
                    gamesLost: player.games_lost,
                    winRate: ((player.games_won / (player.games_won + player.games_lost)) * 100) || 0
                }));
    
                setMaxWins(maxStats.maxWins);
                setMaxGames(maxStats.maxGames);
                setPlayerStats(playerStatsData);
            } catch (error) {
                console.error('Error fetching player stats:', error);
            }
        };
    
        getPlayerStats();
    }, []);

    const sortPlayers = () => {
        const sortedPlayerStats = [...playerStats];

        switch (dropState) {
            case "Wins":
                sortedPlayerStats.sort((a, b) => b.gamesWon - a.gamesWon);
                break;
            case "Games":
                sortedPlayerStats.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
                break;
            case "WinRate":
            default:
                sortedPlayerStats.sort((a, b) => b.winRate - a.winRate);
                break;
        }

        return sortedPlayerStats;
    }

    const renderGauge = () => {
        const sortedPlayerStats = sortPlayers();

        switch (dropState) {
            case "Wins":
                return sortedPlayerStats.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>
                            <div className="progress" role="progressbar" aria-label="Wins" aria-valuenow={player.gamesWon} aria-valuemin="0" aria-valuemax={maxWins}>
                                <div className="progress-bar bg-success" style={{ width: `${(player.gamesWon / maxWins) * 100}%` }}>{player.gamesWon}</div>
                            </div>
                        </td>
                    </tr>
                ));
            case "Games":
                return sortedPlayerStats.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>
                            <div className="progress" role="progressbar" aria-label="Games" aria-valuenow={player.gamesPlayed} aria-valuemin="0" aria-valuemax={maxGames}>
                                <div className="progress-bar bg-success" style={{ width: `${(player.gamesPlayed / maxGames) * 100}%` }}>{player.gamesPlayed}</div>
                            </div>
                        </td>
                    </tr>
                ));
            case "WinRate":
            default:
                return sortedPlayerStats.map((player, index) => (
                    <tr key={index}>
                        <td>{player.name}</td>
                        <td>
                            <div className="progress" role="progressbar" aria-label="Win Rate" aria-valuenow={player.winRate} aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar bg-success" style={{ width: `${player.winRate}%` }}>{player.winRate.toFixed(2)}%</div>
                            </div>
                        </td>
                    </tr>
                ));
        }
    };

    return (
        <div className="card">
            <div className="card-header bg-info text-white">
                {t('graph')}
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('player')}</th>
                            <th style={{ width: "75%" }}>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {dropState === "Wins" ? t('games_won') : dropState === "Games" ? t('games_played') : t('win_rate')}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><button className="dropdown-item" onClick={() => setDropState("Wins")}>{t('games_won')}</button></li>
                                        <li><button className="dropdown-item" onClick={() => setDropState("Games")}>{t('games_played')}</button></li>
                                        <li><button className="dropdown-item" onClick={() => setDropState("WinRate")}>{t('win_rate')}</button></li>
                                    </ul>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderGauge()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Graph = () => {
    const { t } = useTranslation();
    
    return (
        <Block> 
            <WinRateGauge />
        </Block>
    );
};

export default Graph;
