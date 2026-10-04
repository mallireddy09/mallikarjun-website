import type { GalleryItem } from "../types/portfolio";
import ibm_ml from '../img/certification/ibm_ml.png';
import google_da from '../img/certification/google_da.png';
import google_ada from '../img/certification/google_ada.png';
import ibm_da from '../img/certification/ibm_da.png';
import ibm_sql from '../img/certification/ibm_sql.png';
import ibm_python from '../img/certification/ibm_python.png';
import ibm_dv from '../img/certification/ibm_dv.png';
import ibm_ds from '../img/certification/ibm_ds.png';
import aws_ml from '../img/certification/aws_ml.png';
import uc_dbms from '../img/certification/cousera_dbms.png';
import ucdavis_web_development from '../img/certification/coursera_web_development.png';
import linkedIn_git_github from '../img/certification/linkedIn_git_github.png';
import linkedIn_react_native from '../img/certification/linkedIn_react_native.png';
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
        id: 3,
        title: 'Google AI Professional Certificate',
        by: 'Coursera-GOOGLE',
        date: '1',
        month: 'March',
        image: google_ai,
        link: 'https://coursera.org/verify/professional-cert/HGEI9QEU0QTD'
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
        id: 7,
        title: 'IBM Data Science Professional Certificate',
        by: 'Coursera-IBM',
        date: '24',
        month: 'March',
        image: ibm_ds,
        link: 'https://www.coursera.org/account/accomplishments/specialization/8YKEQHV3MT7W'
    },
    {
        id: 8,
        title: 'AWS Certified Machine Learning',
        by: 'AWS',
        date: '12',
        month: 'April',
        image: aws_ml,
        link: 'https://explore.skillbuilder.aws/learn/lp/28/machine-learning-learning-plan'
    },
    {
        id: 9,
        title: 'Machine Learning with Python',
        by: 'Coursera-IBM',
        date: '24',
        month: 'March',
        image: ibm_ml,
        link: 'https://www.coursera.org/account/accomplishments/verify/JMPT32SX674E'
    },
    {
        id: 10,
        title: 'Data Analysis with Python',
        by: 'Coursera-IBM',
        date: '21',
        month: 'March',
        image: ibm_da,
        link: 'https://www.coursera.org/account/accomplishments/verify/N9Z3A9JPZSUN'
    },
    {
        id: 11,
        title: 'Databases and SQL for Data Science with Python',
        by: 'Coursera-IBM',
        date: '21',
        month: 'March',
        image: ibm_sql,
        link: 'https://www.coursera.org/account/accomplishments/verify/QLNQXX7LTV2T'
    },
    {
        id: 12,
        title: 'Python for Data Science, AI & Development',
        by: 'Coursera-IBM',
        date: '12',
        month: 'March',
        image: ibm_python,
        link: 'https://www.coursera.org/account/accomplishments/verify/KLYBDNT5LFG6'
    },
    {
        id: 13,
        title: 'Data Visualization with Python',
        by: 'Coursera-IBM',
        date: '21',
        month: 'March',
        image: ibm_dv,
        link: 'https://www.coursera.org/account/accomplishments/verify/KZLM37DQ5T88'
    },
    {
        id: 14,
        title: 'Accenture Developer Program',
        by: 'Accenture',
        date: '2022',
        month: 'September',
        link: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Accenture%20Nordics/PxenP4rHNE6Bh4nQz_Accenture%20Nordics_hYzTXYNd4gaxkpsYq_1662391415861_completion_certificate.pdf'
    },
    {
        id: 15,
        title: 'Python Essential Training',
        by: 'LinkedIn Learning',
        date: '2022',
        month: 'September',
        link: 'https://linkedin.com/learning/certificates/2525f056f096a3afc3b2e2ff3e366b946f1894184d43316ab84014c93f003dd0'
    },
    {
        id: 16,
        title: 'SQL Essential Training',
        by: 'LinkedIn Learning',
        date: '2022',
        month: 'September',
        link: 'https://linkedin.com/learning/certificates/445c6b04208480f7eb018fa7dd338e89450f53f8f7772b6aca4afed4c36514b5'
    },
    {
        id: 17,
        title: 'Machine Learning Algorithms: Supervised Learning Tip to Tail',
        by: 'Coursera',
        date: '2021',
        month: 'July',
        link: 'https://coursera.org/account/accomplishments/certificate/CWQF45QUB62R'
    },
    {
        id: 18,
        title: 'Python Data Structures',
        by: 'Coursera',
        date: '2021',
        month: 'March',
        link: 'https://coursera.org/account/accomplishments/certificate/7ASY4RBCDFZV'
    },
    {
        id: 19,
        title: 'Programming for Everybody (Getting Started with Python)',
        by: 'Coursera',
        date: '2021',
        month: 'January',
        link: 'https://coursera.org/account/accomplishments/certificate/J2JKKM63NJDM'
    },
    {
        id: 20,
        title: 'Machine Learning with Python',
        by: 'Dhyanahitha Organization',
        date: '2021',
        month: 'September',
        link: 'https://www.linkedin.com/in/mallireddy09/'
    },
    {
        id: 21,
        title: 'Problem Solving & Programming with Python',
        by: 'Dhyanahitha Organization',
        date: '2019',
        month: 'June',
        link: 'https://www.linkedin.com/in/mallireddy09/'
    },
    {
        id: 22,
        title: 'Database Management Essentials',
        by: 'Coursera-UC',
        date: '21',
        month: 'October',
        image: uc_dbms,
        link: 'https://www.coursera.org/account/accomplishments/certificate/4VHA5RW6EAB6'
    },
    {
        id: 23,
        title: 'Introduction to Web Development',
        by: 'Coursera',
        date: '04',
        month: 'February',
        image: ucdavis_web_development,
        link: 'https://www.coursera.org/account/accomplishments/certificate/QNYZ2F7U8Z7D'
    },
    {
        id: 24,
        title: 'Learning Git and GitHub',
        by: 'LinkedIn',
        date: '06',
        month: 'September',
        image: linkedIn_git_github,
        link: 'https://www.linkedin.com/learning/certificates/57a244f76820164ab8e27761eafcc49f8df02fe3e31ae104de55711951bb43f5?trk=share_certificate'
    },
    {
        id: 25,
        title: 'Become a React Native Developer',
        by: 'LinkedIn',
        date: '15',
        month: 'September',
        image: linkedIn_react_native,
        link: 'https://www.linkedin.com/learning/paths/become-a-react-native-developer'
    }
];

export default certificates;
