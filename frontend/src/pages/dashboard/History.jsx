import i18next from "i18next";
import { director } from "../../lib/Director";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import "./Users.css";
import { useParams } from "react-router-dom";
import Block from "../../components/block/Block";

const Stats = () => {
    const [userMatches, setUserMatches] = useState([]);
	const {t} = useTranslation();

    useEffect(() => {
        let getMatchs = async() => {
            let data = await director("game/all-matches/")
            setUserMatches(data);
        }
        getMatchs();
    }, []);


    return (
		<Block title={t("match_history")} color="bg-success">
			<div className="changelogs-list my-3">
				{userMatches.map(match => (
					<div key={match.id} className="card mb-3">
						<div className="card-body">
							<p className="card-title mb-1">
								<strong>{t('score')} : </strong>
								<span className={match.score_player1 > match.score_player2 ? 'text-success' : 'text-danger'}>{match.score_player1}</span> - <span className={match.score_player2 > match.score_player1 ? 'text-success' : 'text-danger'}>{match.score_player2}</span>
							</p>
							<p className="card-text mb-1">
								<a href={`/user/${match.player1}`} className="text-decoration-none">{match.player1}</a> vs <a href={`/user/${match.player2}`} className="text-decoration-none">{match.player2 ? match.player2 : "anonyme"}</a> on {match.game_mode}
							</p>
							<span className="text-muted">{new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(match.date_played))}</span>
						</div>
					</div>
				))}
			</div>
		</Block>
	);	
};

function History() {
    return (
        <>
            <Stats></Stats>
        </>
    )
}

export default History;