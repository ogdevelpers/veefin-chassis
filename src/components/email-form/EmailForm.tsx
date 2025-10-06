import { useState } from "react"; 
import Spinner from "../Spinner";
 

const countries = [
  { code: 'IN', name: 'India', dial: '+91', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 150'%3E%3Crect fill='%23FF9933' width='225' height='50'/%3E%3Crect fill='%23fff' y='50' width='225' height='50'/%3E%3Crect fill='%23138808' y='100' width='225' height='50'/%3E%3Ccircle fill='%23000080' cx='112.5' cy='75' r='20'/%3E%3Ccircle fill='%23fff' cx='112.5' cy='75' r='17.5'/%3E%3Ccircle fill='%23000080' cx='112.5' cy='75' r='3.5'/%3E%3C/svg%3E" },
  { code: 'US', name: 'United States', dial: '+1', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7410 3900'%3E%3Crect width='7410' height='3900' fill='%23b22234'/%3E%3Cpath d='M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0' stroke='%23fff' stroke-width='300'/%3E%3Crect width='2964' height='2100' fill='%233c3b6e'/%3E%3C/svg%3E" },
  { code: 'GB', name: 'United Kingdom', dial: '+44', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3E%3Crect width='60' height='30' fill='%23012169'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23fff' stroke-width='6'/%3E%3Cpath d='M0,0 L60,30 M60,0 L0,30' stroke='%23C8102E' stroke-width='4' clip-path='inset(0)'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23fff' stroke-width='10'/%3E%3Cpath d='M30,0 V30 M0,15 H60' stroke='%23C8102E' stroke-width='6'/%3E%3C/svg%3E" },
  { code: 'CA', name: 'Canada', dial: '+1', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Crect width='1000' height='500' fill='%23fff'/%3E%3Crect width='250' height='500' fill='%23ff0000'/%3E%3Crect x='750' width='250' height='500' fill='%23ff0000'/%3E%3Cpath d='M500,125 l-25,75 l-75,-25 l50,50 l-75,25 l75,25 l-50,50 l75,-25 l25,75 l25,-75 l75,25 l-50,-50 l75,-25 l-75,-25 l50,-50 l-75,25 z' fill='%23ff0000'/%3E%3C/svg%3E" },
  { code: 'AU', name: 'Australia', dial: '+61', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1280 640'%3E%3Crect width='1280' height='640' fill='%2300008B'/%3E%3C/svg%3E" },
  { code: 'DE', name: 'Germany', dial: '+49', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 3'%3E%3Crect width='5' height='3' fill='%23000'/%3E%3Crect width='5' height='2' y='1' fill='%23D00'/%3E%3Crect width='5' height='1' y='2' fill='%23FFCE00'/%3E%3C/svg%3E" },
  { code: 'FR', name: 'France', dial: '+33', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23ED2939'/%3E%3Crect width='600' height='600' fill='%23fff'/%3E%3Crect width='300' height='600' fill='%23002395'/%3E%3C/svg%3E" },
  { code: 'JP', name: 'Japan', dial: '+81', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23fff'/%3E%3Ccircle cx='450' cy='300' r='180' fill='%23BC002D'/%3E%3C/svg%3E" },
  { code: 'CN', name: 'China', dial: '+86', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 900 600'%3E%3Crect width='900' height='600' fill='%23DE2910'/%3E%3C/svg%3E" },
  { code: 'BR', name: 'Brazil', dial: '+55', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 720 504'%3E%3Crect width='720' height='504' fill='%23009b3a'/%3E%3Cpath d='M360,52 L652,252 L360,452 L68,252 Z' fill='%23fedf00'/%3E%3Ccircle cx='360' cy='252' r='100' fill='%23002776'/%3E%3C/svg%3E" },
  { code: 'AF', name: 'Afghanistan', dial: '+93', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath d='M0 0h30v6.67h-30z' fill='%23000000'/%3E%3Cpath d='M0 6.67h30v6.66h-30z' fill='%23da251d'/%3E%3Cpath d='M0 13.33h30v6.67h-30z' fill='%23007e3a'/%3E%3Cpath d='M15 10l-1.5 4.5-4.5-1.5 1.5-4.5-4.5-1.5 4.5-1.5-1.5-4.5 4.5 1.5 4.5-1.5-1.5 4.5 4.5 1.5-4.5 1.5 1.5 4.5 4.5-1.5-4.5-4.5z' fill='%23fff'/%3E%3C/svg%3E" },
  { code: 'AL', name: 'Albania', dial: '+355', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CE1126' width='30' height='20'/%3E%3Cpath d='M15 3.33L10 10l5 6.67 5-6.67-5-6.67z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'DZ', name: 'Algeria', dial: '+213', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath d='M0 0h10l7 10-7 10H0z' fill='%23FF0000'/%3E%3Cpath d='M10 0h20v20H10z' fill='%23FFF'/%3E%3Cpath d='M20 0h10v20H20z' fill='%23008000'/%3E%3Cpath d='M15 6.67l1.25 3.85h4.05l-3.28 2.38 1.25 3.85-3.28-2.38-3.28 2.38 1.25-3.85-3.28-2.38h4.05z' fill='%23FCD116'/%3E%3C/svg%3E" },
  { code: 'AR', name: 'Argentina', dial: '+54', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%2340C057' width='30' height='13.33'/%3E%3Crect fill='%23FFF' y='13.33' width='30' height='6.67'/%3E%3Cpath d='M8.33 5l-.83 2.5H4.17l2.08 1.5-.83 2.5 2.08-1.5 2.08 1.5-.83-2.5 2.08-1.5h-3.33l-.83-2.5z' fill='%23FFF'/%3E%3Ccircle fill='%2300A651' cx='15' cy='16.67' r='3.33'/%3E%3C/svg%3E" },
  { code: 'AT', name: 'Austria', dial: '+43', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23ED2939' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23ED2939' y='13.33' width='30' height='6.67'/%3E%3C/svg%3E" },
  { code: 'AZ', name: 'Azerbaijan', dial: '+994', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath d='M0 0h30v20H0z' fill='%23008F4C'/%3E%3Cpath d='M0 0h30v10H0z' fill='%23F2A800'/%3E%3Cpath d='M10 5l1.67 5H5l5 3.33-2 6.67L10 15l3.33 5-2-6.67 5-3.33h-6.67L10 5z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'BH', name: 'Bahrain', dial: '+973', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%23CE1126' width='10' height='20'/%3E%3Cpath d='M15 0l6.67 10L15 20l-6.67-10L15 0z' fill='%23FFF' stroke='%23CE1126' stroke-width='2'/%3E%3Czigzag d='M13 8l2 2 2-2' fill='none' stroke='%23CE1126' stroke-width='1.5'/%3E%3C/svg%3E" },
  { code: 'BD', name: 'Bangladesh', dial: '+880', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23F42A41' width='30' height='20'/%3E%3Ccircle fill='%23FFF' cx='18' cy='10' r='5'/%3E%3C/svg%3E" },
  { code: 'BY', name: 'Belarus', dial: '+375', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23D52B1E' width='30' height='10'/%3E%3Crect fill='%23FDBE00' y='10' width='30' height='10'/%3E%3Crect fill='%23FDBE00' width='15' height='10'/%3E%3Crect fill='%23D52B1E' x='15' y='10' width='15' height='10'/%3E%3C/svg%3E" },
  { code: 'BE', name: 'Belgium', dial: '+32', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23000' width='10' height='20'/%3E%3Crect fill='%23FAE042' x='10' width='10' height='20'/%3E%3Crect fill='%23ED2939' x='20' width='10' height='20'/%3E%3C/svg%3E" },
  { code: 'BT', name: 'Bhutan', dial: '+975', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23F02A36' width='30' height='10'/%3E%3Crect fill='%23002B7F' y='10' width='30' height='10'/%3E%3Cpath d='M12 6l2.5 7.5h7.5l-6 4.5 2.5 7.5-6-4.5-6 4.5 2.5-7.5-6-4.5h7.5z' fill='%23FFF'/%3E%3Cpath d='M12 6l2 6h6l-4.8 3.6 2 6-4.8-3.6-4.8 3.6 2-6-4.8-3.6h6z' fill='%23FECB00'/%3E%3C/svg%3E" },
  { code: 'BO', name: 'Bolivia', dial: '+591', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23D52B1E' width='30' height='6.67'/%3E%3Crect fill='%23FCD116' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='13.33' width='30' height='6.67'/%3E%3Cpath d='M10 8l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z' fill='%23004B9E'/%3E%3C/svg%3E" },
  { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath d='M0 0h30v20H0z' fill='%23007E3A'/%3E%3Cpath d='M15 0v20' stroke='%23FFF' stroke-width='4'/%3E%3Cpath d='M0 10h30' stroke='%23FFF' stroke-width='4'/%3E%3Ccircle fill='%23FFF' cx='15' cy='10' r='6'/%3E%3C/svg%3E" },
  { code: 'BG', name: 'Bulgaria', dial: '+359', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='10'/%3E%3Crect fill='%23D63034' y='10' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'KH', name: 'Cambodia', dial: '+855', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23002B7F' width='30' height='13.33'/%3E%3Crect fill='%23FFF' y='13.33' width='30' height='6.67'/%3E%3Cpath d='M15 5l4.33 2.67L25 5l-5.67 4.33L25 14l-4.33-2.67L15 14l-5.67-2.67 4.33 2.67L10 5z' fill='%23002B7F'/%3E%3C/svg%3E" },
  { code: 'CL', name: 'Chile', dial: '+56', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%23E31B23' width='5' height='20'/%3E%3Crect fill='%23003FA4' x='5' width='25' height='13.33'/%3E%3Crect fill='%23FFF' x='5' y='13.33' width='25' height='6.67'/%3E%3Ccircle fill='%23FFF' cx='7.5' cy='10' r='1.67'/%3E%3C/svg%3E" },
  { code: 'CO', name: 'Colombia', dial: '+57', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23D52B1E' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23003DA5' y='13.33' width='30' height='6.67'/%3E%3Ccircle fill='%23FFF' cx='15' cy='10' r='4' stroke='%23003DA5' stroke-width='1'/%3E%3C/svg%3E" },
  { code: 'HR', name: 'Croatia', dial: '+385', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%23ED2939' width='10' height='20'/%3E%3Cpath fill='%23FFF' d='M12 3l1.73 5.33h5.66l-4.58 3.33L17.73 17l-4.58-3.33H12l-4.58 3.33L12 11.66l-4.58-3.33h5.66L11 3z'/%3E%3Cpath fill='%23ED2939' d='M13 5l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z'/%3E%3C/svg%3E" },
  { code: 'CZ', name: 'Czech Republic', dial: '+420', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23D18F32' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Cpath d='M10 0l7.5 5-7.5 5 7.5-5z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'DK', name: 'Denmark', dial: '+45', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23C60C30' width='30' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23FFF' y='5' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'EG', name: 'Egypt', dial: '+20', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%23CE1126' width='10' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='15'/%3E%3Crect fill='%23FCD116' x='20' y='2.5' width='10' height='15'/%3E%3Crect fill='%23007E3A' x='20' y='17.5' width='10' height='2.5'/%3E%3Cpath d='M8 6.67l2.5 1.67h1.67v5h-1.67v1.67h-2.5v-1.67h-1.67v-5h1.67z' fill='%23008C45'/%3E%3C/svg%3E" },
  { code: 'EE', name: 'Estonia', dial: '+372', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23269E68' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'FI', name: 'Finland', dial: '+358', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23002F65' width='30' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23FFF' y='5' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'GR', name: 'Greece', dial: '+30', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%2300674D' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Crect fill='%2300674D' x='5' width='5' height='10'/%3E%3Crect fill='%23FFF' x='10' y='10' width='10' height='10'/%3E%3Crect fill='%2300674D' x='20' width='5' height='10'/%3E%3Crect fill='%23FFF' x='25' y='10' width='5' height='10'/%3E%3C/svg%3E" },
  { code: 'HU', name: 'Hungary', dial: '+36', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23D24705' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23DC143C' y='13.33' width='30' height='6.67'/%3E%3C/svg%3E" },
  { code: 'IS', name: 'Iceland', dial: '+354', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%23007AB8' x='10' width='10' height='20'/%3E%3Crect fill='%23DC143C' y='5' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'ID', name: 'Indonesia', dial: '+62', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23ED2939' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'IR', name: 'Iran', dial: '+98', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23DA251D' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%230082A6' y='13.33' width='30' height='6.67'/%3E%3Cpath d='M25 8h-20v4h20v-4z' fill='%23F9D31C'/%3E%3Cpath d='M23 9h-16v2h16v-2z' fill='%23DA251D'/%3E%3C/svg%3E" },
  { code: 'IQ', name: 'Iraq', dial: '+964', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CE1126' width='30' height='13.33'/%3E%3Crect fill='%23FFF' y='13.33' width='30' height='6.67'/%3E%3Crect fill='%23FFF' x='5' width='5' height='13.33'/%3E%3Crect fill='%23008C45' x='10' width='15' height='6.67'/%3E%3Cpath d='M20 3.33h5v3.33h-5z M20 13.33h5v3.33h-5z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'IE', name: 'Ireland', dial: '+353', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23018F3E' width='10' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23FF6700' x='20' width='10' height='20'/%3E%3C/svg%3E" },
  { code: 'IL', name: 'Israel', dial: '+972', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23293C88' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Cpath fill='%23FFF' d='M7.5 5l2.5 2.5V12.5H10V7.5L12.5 10H15V5l2.5 2.5V5H20V12.5H17.5L15 10v5H12.5V10L10 12.5H7.5V5z'/%3E%3C/svg%3E" },
  { code: 'IT', name: 'Italy', dial: '+39', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CE2B37' width='10' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23009292' x='20' width='10' height='20'/%3E%3C/svg%3E" },
  { code: 'JO', name: 'Jordan', dial: '+962', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CE1126' width='30' height='20'/%3E%3Crect fill='%23FFF' x='7.5' width='15' height='20'/%3E%3Crect fill='%23007E3A' x='22.5' width='7.5' height='20'/%3E%3Cpath d='M15 3.33l1.67 5H20l-4.17 3.03L16.67 17l-4.17-3.03L10 11.33h3.33z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'KZ', name: 'Kazakhstan', dial: '+7', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23007AA5' width='30' height='10'/%3E%3Crect fill='%23FECB00' y='10' width='30' height='10'/%3E%3Cpath d='M10 5l2 6h6l-4.8 3.6 2 6-4.8-3.6-4.8 3.6 2-6-4.8-3.6h6z' fill='%23003961'/%3E%3Cpath d='M12 6l1.6 4.8h4.8l-3.84 2.88 1.6 4.8-3.84-2.88-3.84 2.88 1.6-4.8-3.84-2.88h4.8z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'KW', name: 'Kuwait', dial: '+965', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23007A3D' width='30' height='20'/%3E%3Crect fill='%23FFF' x='3' width='24' height='20'/%3E%3Crect fill='%2300025D' x='27' width='3' height='20'/%3E%3Cpath d='M10 8l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z' fill='%23CE1126'/%3E%3C/svg%3E" },
  { code: 'LV', name: 'Latvia', dial: '+371', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23DA3C3D' width='15' height='20'/%3E%3Crect fill='%23FFF' x='15' width='15' height='20'/%3E%3C/svg%3E" },
  { code: 'LB', name: 'Lebanon', dial: '+961', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CE1126' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23ED2939' y='13.33' width='30' height='6.67'/%3E%3Crect fill='%23FFF' x='10' y='8' width='10' height='4'/%3E%3C/svg%3E" },
  { code: 'LY', name: 'Libya', dial: '+218', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23239E46' width='30' height='20'/%3E%3Crect fill='%23FFF' x='5' width='20' height='20'/%3E%3Crect fill='%23000' x='25' width='5' height='20'/%3E%3C/svg%3E" },
  { code: 'LT', name: 'Lithuania', dial: '+370', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CC0000' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23002F70' y='13.33' width='30' height='6.67'/%3E%3C/svg%3E" },
  { code: 'MX', name: 'Mexico', dial: '+52', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23A51931' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23A51931' y='13.33' width='30' height='6.67'/%3E%3Cpath d='M15 8l-1.25 3.75h-3.75l3.04 2.21-1.15 3.75 3.04-2.21 3.04 2.21-1.15-3.75 3.04-2.21h-3.75z' fill='%23007F40'/%3E%3C/svg%3E" },
  { code: 'MA', name: 'Morocco', dial: '+212', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CD9938' width='30' height='20'/%3E%3Crect fill='%23FFF' x='6' width='18' height='20'/%3E%3Crect fill='%230F5DB7' x='24' width='6' height='20'/%3E%3Cpath d='M15 6l3 2 4-2-2 4 3 4-4-2-4 2 2-4-2-4 4 2z' fill='%23CD9938'/%3E%3C/svg%3E" },
  { code: 'MM', name: 'Myanmar', dial: '+95', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FCD116' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23BE1E2D' y='13.33' width='30' height='6.67'/%3E%3Cpath d='M15 3.33l-1.67 5.17H8.33L11.67 10l-2.5 5.17L15 13.33l5 5.17-2.5-5.17L21.67 8.5h-5z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'NP', name: 'Nepal', dial: '+977', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Cpath d='M15 0l7.5 10-7.5 10-7.5-10L15 0z' fill='%23DC143C'/%3E%3Cpath d='M14 5l.67 2H9.33L11.67 8.67l-.67 2 1.67-1.33 1.67 1.33-.67-2L14 5z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'NL', name: 'Netherlands', dial: '+31', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23AE1C28' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23F1A239' y='13.33' width='30' height='6.67'/%3E%3C/svg%3E" },
  { code: 'KP', name: 'North Korea', dial: '+850', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%2324B14F' width='30' height='20'/%3E%3Crect fill='%23FFF' x='5' width='20' height='13.33'/%3E%3Crect fill='%23C60C30' x='5' y='13.33' width='10' height='6.67'/%3E%3Cpath d='M12 11l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'NO', name: 'Norway', dial: '+47', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23EF4135' width='30' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23FFF' y='5' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'PK', name: 'Pakistan', dial: '+92', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23007A3D' width='30' height='20'/%3E%3Crect fill='%23FFF' x='6' width='21' height='20'/%3E%3Crect fill='%23F5C518' x='27' width='3' height='20'/%3E%3Ccircle fill='%23FFF' cx='9' cy='10' r='5'/%3E%3Cpath d='M9 5a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 1a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z' fill='%23F5C518'/%3E%3C/svg%3E" },
  { code: 'PS', name: 'Palestine', dial: '+970', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23007A3D' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Crect fill='%23CE1126' x='20' y='10' width='10' height='10'/%3E%3Ctriangle fill='%23CE1126' points='15,10 25,15 25,5'/%3E%3C/svg%3E" },
  { code: 'PL', name: 'Poland', dial: '+48', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='10'/%3E%3Crect fill='%23DC143C' y='10' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'PT', name: 'Portugal', dial: '+351', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%2300628B' width='18' height='20'/%3E%3Cpath d='M20 5l2.5 2.5 5-2.5-2.5 5 2.5 5-5-2.5-2.5 2.5-5-2.5 2.5-5-5 2.5 2.5-2.5 5 2.5z' fill='%23F18D25'/%3E%3Cpath d='M22 7l1 1 2-1-1 2 1 2-2-1-1 1-2-1 1-2-1-2 2 1z' fill='%23FFF'/%3E%3C/svg%3E" },
  { code: 'QA', name: 'Qatar', dial: '+974', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%238E1515' width='30' height='20'/%3E%3Crect fill='%23FFF' x='3' width='9' height='20'/%3E%3Crect fill='%23007A3D' x='12' width='9' height='20'/%3E%3Crect fill='%23FCD116' x='21' width='9' height='20'/%3E%3Cpath d='M12 8l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z' fill='%23000'/%3E%3C/svg%3E" },
  { code: 'RO', name: 'Romania', dial: '+40', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23002B7F' width='10' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23FCD116' x='20' width='10' height='20'/%3E%3C/svg%3E" },
  { code: 'RU', name: 'Russia', dial: '+7', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='6.67'/%3E%3Crect fill='%23007FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23DF4C24' y='13.33' width='30' height='6.67'/%3E%3C/svg%3E" },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='20'/%3E%3Crect fill='%2332CD32' x='22.5' width='7.5' height='20'/%3E%3Cpath d='M15 5l-1.67 5.17H8.33L11.67 10l-2.5 5.17L15 13.33l5 5.17-2.5-5.17L21.67 8.5h-5z' fill='%23FFF'/%3E%3Ctext x='15' y='14' font-size='3' fill='%23000' text-anchor='middle' font-family='serif' font-weight='bold'%3Eالله أكبر%3C/text%3E%3C/svg%3E" },
  { code: 'SG', name: 'Singapore', dial: '+65', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23ED2939' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Ccircle fill='%23FFF' cx='9' cy='10' r='4' stroke='%23ED2939' stroke-width='1.5'/%3E%3Ccircle fill='%23FFF' cx='6' cy='7' r='1'/%3E%3Ccircle fill='%23FFF' cx='12' cy='7' r='1'/%3E%3Ccircle fill='%23FFF' cx='9' cy='13' r='1'/%3E%3C/svg%3E" },
  { code: 'KR', name: 'South Korea', dial: '+82', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='10'/%3E%3Crect fill='%23CD2E3A' y='10' width='30' height='10'/%3E%3Ccircle fill='%23000' cx='15' cy='5' r='2'/%3E%3Ccircle fill='%23FFF' cx='15' cy='5' r='1'/%3E%3Ccircle fill='%23FFF' cx='15' cy='15' r='2'/%3E%3Ccircle fill='%23000' cx='15' cy='15' r='1'/%3E%3C/svg%3E" },
  { code: 'ES', name: 'Spain', dial: '+34', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23AA151B' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23AA151B' y='13.33' width='30' height='6.67'/%3E%3Cpath fill='%23F1BF00' d='M8 10l1.33-4 1.33 4h4.67l-3.77 2.73 1.33 4-3.77-2.73-3.77 2.73 1.33-4z'/%3E%3C/svg%3E" },
  { code: 'LK', name: 'Sri Lanka', dial: '+94', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FCDD09' width='30' height='10'/%3E%3Cpath fill='%23FFF' d='M0 10h30v10H0z'/%3E%3Crect fill='%23003FA4' width='20' height='10'/%3E%3Cpath d='M20 0l5 10-5 10 5-10z' fill='%23F8D175'/%3E%3Cpath d='M22 5l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z' fill='%23CE1126'/%3E%3Cpath d='M22 15l1-3h-3l2.5-1.8-1-3 2.5 1.8 2.5-1.8-1 3 2.5 1.8h-3z' fill='%23CE1126'/%3E%3C/svg%3E" },
  { code: 'SE', name: 'Sweden', dial: '+46', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23007EB8' width='30' height='20'/%3E%3Crect fill='%23FFF' x='8' width='14' height='20'/%3E%3Crect fill='%23FFF' y='6' width='30' height='8'/%3E%3C/svg%3E" },
  { code: 'CH', name: 'Switzerland', dial: '+41', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23DE5833' width='30' height='20'/%3E%3Crect fill='%23FFF' x='10' width='10' height='20'/%3E%3Crect fill='%23FFF' y='5' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'SY', name: 'Syria', dial: '+963', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23CE1126' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23008E42' y='13.33' width='30' height='6.67'/%3E%3Crect fill='%23FFF' x='20' y='5' width='6.67' height='10'/%3E%3Crect fill='%23CE1126' x='23.33' y='6.67' width='3.33' height='6.67'/%3E%3C/svg%3E" },
  { code: 'TW', name: 'Taiwan', dial: '+886', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23ED1C24' width='30' height='10'/%3E%3Crect fill='%230066CC' y='10' width='30' height='10'/%3E%3Ccircle fill='%23FFF' cx='15' cy='5' r='3'/%3E%3Cpath d='M12 5a3 3 0 1 0 6 0 3 3 0 0 0-6 0' fill='%230066CC'/%3E%3Ccircle fill='%23FFF' cx='15' cy='15' r='3'/%3E%3Cpath d='M12 15a3 3 0 1 0 6 0 3 3 0 0 0-6 0' fill='%23ED1C24'/%3E%3C/svg%3E" },
  { code: 'TH', name: 'Thailand', dial: '+66', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23A51931' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23A51931' y='13.33' width='30' height='6.67'/%3E%3Crect fill='%23FFF' x='10' y='8.33' width='10' height='3.33'/%3E%3C/svg%3E" },
  { code: 'TR', name: 'Turkey', dial: '+90', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23E30A17' width='30' height='20'/%3E%3Ccircle fill='%23FFF' cx='15' cy='10' r='6'/%3E%3Cpath d='M15 4a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6 6 6 0 0 1 6-6m0-2a8 8 0 1 0 8 8 8 8 0 0 0-8-8z' fill='%23E30A17'/%3E%3C/svg%3E" },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23008488' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Crect fill='%23CE1126' width='10' height='10'/%3E%3C/svg%3E" },
  { code: 'VN', name: 'Vietnam', dial: '+84', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23DE1E44' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'ZA', name: 'South Africa', dial: '+27', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23FFF' width='30' height='10'/%3E%3Crect fill='%23E31B23' y='10' width='30' height='10'/%3E%3Crect fill='%23007E3A' x='5' width='20' height='20'/%3E%3Crect fill='%23E31B23' x='25' y='5' width='5' height='10'/%3E%3Crect fill='%23000' x='5' y='5' width='10' height='10'/%3E%3Cpath d='M10 5l2.5 5h5l-4 3 1.67 5-4.17-3-4.17 3 1.67-5-4-3h5z' fill='%23F1C107'/%3E%3C/svg%3E" },
  { code: 'UA', name: 'Ukraine', dial: '+380', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%2300399D' width='30' height='10'/%3E%3Crect fill='%23FFD500' y='10' width='30' height='10'/%3E%3C/svg%3E" },
  { code: 'UY', name: 'Uruguay', dial: '+598', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23083C69' width='30' height='10'/%3E%3Crect fill='%23FFF' y='10' width='30' height='10'/%3E%3Crect fill='%23D23834' x='25' width='5' height='20'/%3E%3Ccircle fill='%23FFF' cx='12.5' cy='10' r='3.33' stroke='%23083C69' stroke-width='1'/%3E%3C/svg%3E" },
  { code: 'VE', name: 'Venezuela', dial: '+58', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect fill='%23D52B1E' width='30' height='6.67'/%3E%3Crect fill='%23FFF' y='6.67' width='30' height='6.67'/%3E%3Crect fill='%23D52B1E' y='13.33' width='30' height='6.67'/%3E%3Crect fill='%23FCD116' x='5' y='6.67' width='20' height='6.67'/%3E%3Cpath d='M12 8l1 3h3l-2.5 1.8 1 3-2.5-1.8-2.5 1.8 1-3-2.5-1.8h3z' fill='%2380209B'/%3E%3C/svg%3E" },
] as const;
 
type Country = {
  code: string;
  name: string;
  dial: string;
  flag: string;
};


const EmailFormModal  = ({selections, handleReset, pngBlob, onEmailSuccess, onLoadingChange }:{selections: Record<string, string[]>, handleReset: ()=>void, pngBlob: Blob | null, onEmailSuccess: (email: string, imageId: string, imageUrl: string) => void, onLoadingChange?: (loading: boolean) => void}) => {
  const [name, setName] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phone,setPhone] = useState<string>('');
  const [status, setStatus]= useState<"default"|"loading" | "success" | "error">("default");
  const [showCountryDropdown, setShowCountryDropdown] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(  { code: 'IN', name: 'India', dial: '+91', flag: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 225 150'%3E%3Crect fill='%23FF9933' width='225' height='50'/%3E%3Crect fill='%23fff' y='50' width='225' height='50'/%3E%3Crect fill='%23138808' y='100' width='225' height='50'/%3E%3Ccircle fill='%23000080' cx='112.5' cy='75' r='20'/%3E%3Ccircle fill='%23fff' cx='112.5' cy='75' r='17.5'/%3E%3Ccircle fill='%23000080' cx='112.5' cy='75' r='3.5'/%3E%3C/svg%3E" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', { name, company, email, selections });
    // Block common personal email providers
    const isBlacklistedEmail = (value: string) => {
      const domain = value.split('@')[1]?.toLowerCase() || '';
      if (!domain) return false;
      const blocked = ['gmail', 'yahoo', 'outlook', 'proton'];
      return blocked.some((b) => domain.includes(b));
    };

    if (isBlacklistedEmail(email)) {
      const msg = 'Please use a company email address (not Gmail/Yahoo/Outlook/Proton).';
      setEmailError(msg);
      alert(msg);
      return;
    }
    
    // Convert PNG blob to base64 for sending
    let pngBase64 = null;
    if (pngBlob) {
      pngBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(pngBlob);
      });
    }

    const formData = {
        username: name,
        companyname: company,
        email,
        selections,
        phone:`${selectedCountry.dial}-${phone}`,
        pngData: pngBase64
    };

    try {
      setStatus("loading");
      onLoadingChange?.(true);
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
    
        console.log('Response:', response);
        if (response.ok) {
            const result = await response.json();
            console.log('Email result:', result);
            if (result.success && result.data.imageId) {
                // Show thank you page even if imageUrl is null (upload failed)
                onEmailSuccess(email, result.data.imageId, result.data.imageUrl || '');
            } else {
                alert('Email sent successfully!');
                setName('');
                setCompany('');
                setEmail('');
                handleReset();
            }
        setStatus("success");
        onLoadingChange?.(false);
        } else {
            alert('Failed to send email. Please try again.');
            console.log('Failed response:', await response.text());
          }
        } catch (error) {
          console.error('Error sending email:', error);
          setStatus("error");
          onLoadingChange?.(false);
        alert('An error occurred while sending the email. Please try again later.');
    } 
  };

  const inputClass = "w-full p-4 bg-[#232228] border-none rounded-lg text-white text-lg placeholder-gray-500 focus:outline-none";
  const labelClass = "text-white font-bold text-base uppercase mb-1";
 
  return (
       <div className="mx-auto"> 
      { status === 'default' &&
      (<form onSubmit={handleSubmit} className="flex flex-col gap-6 overflow-hidden">
        {/* First Row: Name and Company */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>
              Name<span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="company" className={labelClass}>
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputClass}
              required
            />
          </div>
        </div>

        {/* Second Row: Mobile and Email */}
        <div className="grid grid-cols-2 gap-6">
 <div className="flex flex-col gap-2">
            <label htmlFor="phone" className={labelClass}>
              Mobile Number<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="z-69 flex items-center gap-2 px-3 py-3 bg-[#232228] rounded-lg border-none cursor-pointer hover:bg-[#2a292f] transition-colors"
                >
                  <img src={selectedCountry.flag} className="w-6 h-4" />
                  <span className="text-white text-sm ">{selectedCountry.dial}</span>
                  <span className="text-white text-sm">▼</span>
                </button>
                {showCountryDropdown && (
                  <div className="z-69 absolute top-full mt-1 left-0 bg-[#232228] rounded-lg border border-gray-700 shadow-lg z-50 max-h-60 overflow-y-auto w-64">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setShowCountryDropdown(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2 w-full hover:bg-[#2a292f] transition-colors text-left"
                      >
                        <img src={country.flag} alt={country.code} className="w-6 h-4" />
                        <span className="text-white text-sm flex-1">{country.name}</span>
                        <span className="text-gray-400 text-sm">{country.dial}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className={labelClass}>
              Email<span className="text-red-500">*</span>
            </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  const v = e.target.value;
                  setEmail(v);
                  // validate as user types
                  const domain = v.split('@')[1]?.toLowerCase() || '';
                  const blocked = ['gmail', 'yahoo', 'outlook', 'proton'];
                  if (domain && blocked.some((b) => domain.includes(b))) {
                    setEmailError('We do not accept personal email providers (Gmail, Yahoo, Outlook, Proton). Please use your company email.');
                  } else {
                    setEmailError('');
                  }
                }}
                className={inputClass}
                aria-invalid={!!emailError}
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full max-w-[400px] mx-auto py-4 px-6 mt-4 bg-[#27A689] text-white font-bold text-lg uppercase rounded-lg hover:opacity-90 transition-opacity"
        >
          Email Architecture
        </button>
      </form>)}
      { status === 'loading' && <Spinner size={50} message="Sending Email..." />}
    </div>
  );
};

export default EmailFormModal;