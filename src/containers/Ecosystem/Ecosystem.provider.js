import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '../../components/Toast/Toast.Provider';

const EcosystemContext = createContext();

export const useEcosystem = () => useContext(EcosystemContext);

const getRepoURL = () => 'https://api.github.com/repos/DLatouche/junoTest/git/trees/master';
const getJsonURL = (name) => `https://raw.githubusercontent.com/DLatouche/junoTest/master/${name}/index.json`;
const getImageURL = (name, image) => `https://raw.githubusercontent.com/DLatouche/junoTest/master/${name}/${image}`;

const get = (url) => {
    const options = {
        method: 'GET',
        url,
    };
    return axios(options);
};

export const EcosystemProvider = ({ children }) => {
    const [ecosystems, setEcosystems] = useState([]);
    const { showToast } = useToast();

    useEffect(() => {
        const fetch = async () => {
            try {
                const apps = await get(getRepoURL());
                const promises = [];
                apps.data.tree.forEach((app) => {
                    promises.push(get(getJsonURL(app.path)));
                });
                const responses = await Promise.all(promises);
                const res = [];
                responses.forEach((response, index) => {
                    const app = {
                        address: response.data.address,
                        image: getImageURL(apps.data.tree[index].path, response.data.image),
                        name: response.data.name,
                        tgLink: response.data.tg_link,
                        twitterLink: response.data.twitter_link,
                        githubLink: response.data.github_link,
                        type: response.data.type,

                    };
                    res.push(app);
                });
                setEcosystems((prev) => [...res]);
            } catch (error) {
                console.log('%cEcosystem.provider.js -> 26 ERROR: error', 'background: #FF0000; color:#FFFFFF', error);
                showToast({ text: 'Impossible to load ecosystem', severity: 'error' });
            }
        };
        fetch();
    }, []);

    return <EcosystemContext.Provider value={{ ecosystems }}>{children}</EcosystemContext.Provider>;
};
