import Block from "../../components/block/Block";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { director } from "../../lib/Director";
import React from "react";

const WinRateGauge = () => {
    const [playerStats, setPlayerStats] = useState([]);
    const [leftWins, setLeftWins] = useState(0);
    const [rightWins, setRightWins] = useState(0);
    const [averageLeftpoints, setAverageLeftpoints] = useState(0);
    const [averageRightpoints, setAverageRightpoints] = useState(0);
    const {t} = useTranslation();

    useEffect(() => {
        let getMatches = async () => {
            try {
                const data = await director("game/all-matches/");
                calculateWins(data);
            } catch (error) {
                console.error('Error fetching match data:', error);
            }
        };
        getMatches();
    }, []);

    const calculateWins = (matches) => {
        let leftWinsCount = 0;
        let rightWinsCount = 0;
        let leftPoints = 0;
        let rightPoints = 0;
        
        matches.forEach(match => {
            if (match.score_player1 > match.score_player2) {
                leftWinsCount++;
            } else if (match.score_player2 > match.score_player1) {
                rightWinsCount++;
            }
            leftPoints += match.score_player1;
            rightPoints += match.score_player2;
        });
        setLeftWins(leftWinsCount);
        setRightWins(rightWinsCount);
        setAverageLeftpoints(leftPoints / matches.length);
        setAverageRightpoints(rightPoints / matches.length);
    };

    useEffect(() => {
        const getPlayerStats = async () => {
            try {
                const playersData = await director("auth/get_users");

                const playerStatsData = playersData.map(player => ({
                    name: player.username,
                    gamesPlayed: player.games_won + player.games_lost,
                    gamesWon: player.games_won,
                    gamesLost: player.games_lost,
                    winRate: ((player.games_won / (player.games_won + player.games_lost)) * 100) || 0
                }));

                setPlayerStats(playerStatsData);
            } catch (error) {
                console.error('Error fetching player stats:', error);
            }
        };

        getPlayerStats();
    }, []);

    return (
        <div className="card">
            <div className="card-header bg-danger text-white">
                {t('stats')}
            </div>
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>{t('player')}</th>
                            <th>{t('games_played')}</th>
                            <th>{t('games_won')}</th>
                            <th style={{ width: "30%" }}>{t('win_rate')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerStats.map((player, index) => (
                            <tr key={index}>
                                <td>{player.name}</td>
                                <td>{player.gamesPlayed}</td>
                                <td>{player.gamesWon}</td>
                                <td style={{ width: "30%" }}>
                                    <div className="progress" role="progressbar" aria-label="Taux de victoire" aria-valuenow={player.winRate} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar bg-success" style={{ width: `${player.winRate}%` }}>{player.winRate.toFixed(2)}%</div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>{t('left_win')} :</td>
                                <td>{leftWins}</td>
                            </tr>
                            <tr>
                                <td>{t('right_win')} :</td>
                                <td>{rightWins}</td>
                            </tr>
                            <tr>
                                <td>{t('left_points')} :</td>
                                <td>{averageLeftpoints.toFixed(1)}</td>
                            </tr>
                            <tr>
                                <td>{t('right_points')} :</td>
                                <td>{averageRightpoints.toFixed(1)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
};

const Stats = () => {
    return (
        <Block> 
            <WinRateGauge />
        </Block>
    );
};

export default Stats;