import "./Sidebar.css"
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <nav className="sidebar">
            <img className="logo" src="/logo.png"/>
            <div>
                <NavLink to="/" activeclassname="active">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" height="32" width="32"><g id="dashboard-3--app-application-dashboard-home-layout-vertical"><path id="Vector" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M29.71428571428571 14.857142857142856H20.57142857142857c-0.6311771428571428 0 -1.1428571428571428 0.51168 -1.1428571428571428 1.1428571428571428v13.714285714285714c0 0.6310857142857142 0.51168 1.1428571428571428 1.1428571428571428 1.1428571428571428h9.142857142857142c0.6310857142857142 0 1.1428571428571428 -0.5117714285714285 1.1428571428571428 -1.1428571428571428V16c0 -0.6311771428571428 -0.5117714285714285 -1.1428571428571428 -1.1428571428571428 -1.1428571428571428Z" strokeWidth="1"></path><path id="Vector_2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M29.71428571428571 1.1428571428571428H20.57142857142857c-0.6311771428571428 0 -1.1428571428571428 0.5116754285714286 -1.1428571428571428 1.1428571428571428v4.594285714285713c0 0.6311771428571428 0.51168 1.1428571428571428 1.1428571428571428 1.1428571428571428h9.142857142857142c0.6310857142857142 0 1.1428571428571428 -0.51168 1.1428571428571428 -1.1428571428571428V2.2857142857142856c0 -0.6311817142857142 -0.5117714285714285 -1.1428571428571428 -1.1428571428571428 -1.1428571428571428Z" strokeWidth="1"></path><path id="Vector_3" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M11.428571428571427 1.1428571428571428H2.2857142857142856C1.6545325714285712 1.1428571428571428 1.1428571428571428 1.6545325714285712 1.1428571428571428 2.2857142857142856v13.714285714285714c0 0.6311771428571428 0.5116754285714286 1.1428571428571428 1.1428571428571428 1.1428571428571428h9.142857142857142c0.6311771428571428 0 1.1428571428571428 -0.51168 1.1428571428571428 -1.1428571428571428V2.2857142857142856c0 -0.6311817142857142 -0.51168 -1.1428571428571428 -1.1428571428571428 -1.1428571428571428Z" strokeWidth="1"></path><path id="Vector_4" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M11.428571428571427 23.977142857142855H2.2857142857142856c-0.6311817142857142 0 -1.1428571428571428 0.5115428571428571 -1.1428571428571428 1.1428571428571428V29.71428571428571c0 0.6310857142857142 0.5116754285714286 1.1428571428571428 1.1428571428571428 1.1428571428571428h9.142857142857142c0.6311771428571428 0 1.1428571428571428 -0.5117714285714285 1.1428571428571428 -1.1428571428571428v-4.594285714285713c0 -0.6313142857142857 -0.51168 -1.1428571428571428 -1.1428571428571428 -1.1428571428571428Z" strokeWidth="1"></path></g></svg>
                </NavLink>
            </div>
            <div>
                <NavLink to="/local" activeclassname="active">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" height={32} width={32} ><g id="gameboy--entertainment-gaming-device-gameboy"><path id="Ellipse 1042" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M19.428571428571427 24a1.1428571428571428 1.1428571428571428 0 1 0 2.2857142857142856 0 1.1428571428571428 1.1428571428571428 0 1 0 -2.2857142857142856 0" strokeWidth={1} /><path id="Rectangle 1682" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M27.285714285714285 27.92845714285714c0 1.2624 -1.0233142857142856 2.285942857142857 -2.2857142857142856 2.285942857142857h-18c-1.2623542857142855 0 -2.2857142857142856 -1.023542857142857 -2.2857142857142856 -2.2857142857142856V4.071428571428571c0 -1.2623542857142855 1.02336 -2.2857142857142856 2.2857142857142856 -2.2857142857142856h18c1.2624 0 2.2857142857142856 1.02336 2.2857142857142856 2.2857142857142856V27.92845714285714Z" strokeWidth={1} /><path id="Rectangle 1683" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M22.928 17.23549714285714H9.071977142857142V5.697257142857143H22.928v11.538239999999998Z" strokeWidth={1} /><path id="Vector 1906" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M11.734377142857143 25.948571428571427V22.050879999999996" strokeWidth={1} /><path id="Vector 1907" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="m9.785714285714285 24 3.8977828571428565 0" strokeWidth={1} /></g></svg>
                </NavLink>
            </div>
            <div>
                <NavLink to="/tournament" activeclassname="active">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" height={32} width={32} ><g id="trophy--reward-rating-trophy-social-award-media"><path id="Vector" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="m16 21.71428571428571 0 9.142857142857142" strokeWidth={1} /><path id="Vector_2" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="m8 30.857142857142854 16 0" strokeWidth={1} /><path id="Vector_3" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M8 1.1428571428571428h-6.857142857142857v6.857142857142857c0 3.787085714285714 3.070057142857143 6.857142857142857 6.857142857142857 6.857142857142857v-13.714285714285714Z" strokeWidth={1} /><path id="Vector_4" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M24 1.1428571428571428h6.857142857142857v6.857142857142857c0 3.787085714285714 -3.069942857142857 6.857142857142857 -6.857142857142857 6.857142857142857v-13.714285714285714Z" strokeWidth={1} /><path id="Vector_5" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M8 1.1428571428571428V13.714285714285714c0 4.418285714285714 3.5817142857142854 8 8 8s8 -3.5817142857142854 8 -8V1.1428571428571428h-16Z" strokeWidth={1} /></g></svg>    
                </NavLink>
            </div>
            <div>
                <NavLink to="/users" activeclassname="active">
                <svg xmlns="http://www.w3.org/2000/svg"  height={32} width={32} viewBox="0 0 256 256"><path fill="white" d="M229.19 213c-15.81-27.32-40.63-46.49-69.47-54.62a70 70 0 1 0-63.44 0C67.44 166.5 42.62 185.67 26.81 213a6 6 0 1 0 10.38 6c19.21-33.19 53.15-53 90.81-53s71.6 19.81 90.81 53a6 6 0 1 0 10.38-6M70 96a58 58 0 1 1 58 58a58.07 58.07 0 0 1-58-58"/></svg>                </NavLink>
            </div>
            <div>
                <NavLink to="/dashboard" activeclassname="active">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="bi bi-clipboard-data" viewBox="0 0 16 16">
                    <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                    </svg>
                </NavLink>
            </div>

        </nav>
    )
}

export default Sidebar