import type { GalleryItem } from "../types/portfolio";
import google_da from '../img/certification/google_da.png';
import google_ada from '../img/certification/google_ada.png';
import fabric_de from '../img/certification/fabric_de.png';
import fabric_ae from '../img/certification/fabric_ae.png';
import databricks_de from '../img/certification/databricks_de.png';
import google_ai from '../img/certification/google_ai.png';
import mongodb_python from '../img/certification/mongodb_python.png';

const certificates: GalleryItem[] = [
    {
        id: 0,
        title: 'Microsoft Certified: Fabric Data Engineer Associate',
        by: 'Microsoft',
        date: '4',
        month: 'June',
        image: fabric_de,
        link: 'https://www.linkedin.com/in/mallireddy09/'
    },
    {
        id: 1,
        title: 'Databricks Certified Data Engineer Associate',
        by: 'Databricks',
        date: '7',
        month: 'May',
        image: databricks_de,
        link: 'https://www.linkedin.com/in/mallireddy09/'
    },
    {
        id: 2,
        title: 'Microsoft Certified: Fabric Analytics Engineer Associate',
        by: 'Microsoft',
        date: '17',
        month: 'December',
        image: fabric_ae,
        link: 'https://www.linkedin.com/in/mallireddy09/'
    },
    {
        id: 4,
        title: 'MongoDB Python Developer Path',
        by: 'MongoDB',
        date: '14',
        month: 'December',
        image: mongodb_python,
        link: 'https://www.linkedin.com/in/mallireddy09/'
    },
    {
        id: 5,
        title: 'Google Data Analytics Professional Certificate',
        by: 'Coursera-GOOGLE',
        date: '16',
        month: 'November',
        image: google_da,
        link: 'https://www.coursera.org/account/accomplishments/professional-cert/YZ8AU1NDBEO3'
    },
    {
        id: 6,
        title: 'Google Advanced Data Analytics Professional Certificate',
        by: 'Coursera-GOOGLE',
        date: '16',
        month: 'November',
        image: google_ada,
        link: 'https://www.coursera.org/account/accomplishments/professional-cert/TUFMXDMX0KHC'
    },
    {
        id: 3,
        title: 'Google AI Professional Certificate',
        by: 'Coursera-GOOGLE',
        date: '1',
        month: 'March',
        image: google_ai,
        link: 'https://coursera.org/verify/professional-cert/HGEI9QEU0QTD'
    }
];

export default certificates;
