import React, {useState} from "react";
import cn from "classnames";
import {v4 as uuidv4} from 'uuid';
import IconArrow from "../icons/IconArrow";
import IconTwitterRounded from "../icons/IconTwitterRounded";
import IconTelegramRounded from "../icons/IconTelegramRounded";
import IconRedditRounded from "../icons/IconRedditRounded";
import IconBitcoinTalkRounded from "../icons/IconBitcoinTalkRounded";
import IconInstagramRounded from "../icons/IconInstagramRounded";
import IconFacebookRounded from "../icons/IconFacebookRounded";
import IconLinkedinRounded from "../icons/IconLinkedinRounded";

const sections = [
    {
        title: 'Advertising',
        content: [
            <a href='https://aads.com/advertise'>Banner advertising</a>,
            <a href='https://aads.com/marketplace/advertiser/'>Content ad publication</a>,
            <a href='https://aads.com/crypto-affiliate-program/'>Affiliate program</a>,
        ],
    },
    {
        title: 'Earning',
        content: [
            <a href='https://aads.com/earn/'>Banner ad traffic monetization</a>,
            <a href='https://aads.com/marketplace/publisher/'>Earning from ad publication</a>,
            <a href='https://aads.com/crypto-referral-program/'>Referral program</a>,
        ],
    },
    {
        title: 'Collaborations',
        content: [
            <a href='https://aads.com/advertising-agencies/'>Marketing agencies</a>,
            <a target='_blank' href='/blog/elevate-your-startups-global-fame/'>Startups</a>,
            <a href='https://aads.com/bug-bounty/'>Bug bounty program</a>,
        ],
    },
    {
        title: 'Service',
        content: [
            <a href='https://aads.com/statistics/'>Network Statistics</a>,
            <a href='https://status.a-ads.com/en/' target='_blank' rel='noreferrer'>
                System Status
            </a>,
            <a href='https://help.aads.com/en/'>
                Help Center
            </a>
        ],
    },
    {
        title: 'Company',
        content: [
            <a href='https://aads.com/about-us/'>About us</a>,
            <a href='https://aads.com/team/'>Our Team</a>,
            <a href='/blog' target='_blank' rel='noreferrer'>
                Blog
            </a>
        ],
    },
]

const currentYear = new Date().getFullYear();

const Footer = () => {
    const [activeSections, setActiveSections] = useState([])

    const handleClick = (index) => {
        if (activeSections.includes(index)) {
            setActiveSections(activeSections.filter((item) => item !== index))
        } else {
            setActiveSections([...activeSections, index])
        }
    }

    return (
        <footer className="footer-wrap">
            <section className="footer-text">
                <div className="footer-container">
                    <div className="footer-text__content">AADS crypto ad network has worked with crypto
                        and non-crypto websites since 2011, providing banner ad solutions. As a trusted Bitcoin
                        advertising network, we prioritize delivering high-quality crypto ads to amplify your campaign's
                        impact.
                    </div>
                </div>
            </section>
            <div className="footer">
                <div className="footer-container">
                    <div className="footer__accordion">
                        {sections.length
                            ? sections.map((section, index) => {
                                return (
                                    <section className="accordion" key={section.title}>
                                        <button
                                            className={cn('accordion__header', activeSections.includes(index) ? 'active' : '')}
                                            onClick={() => handleClick(index)}
                                        >
                                            <p>{section.title}</p>
                                            <IconArrow className="arrow"/>
                                        </button>

                                        {activeSections.includes(index) &&
                                            section.content.map((link) => (
                                                <div key={uuidv4()} className="accordion__mob">
                                                    {link}
                                                </div>
                                            ))}

                                        <div>
                                            {section.content.map((link) => (
                                                <div key={uuidv4()} className="accordion__desktop">
                                                    {link}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )
                            })
                            : 'Что-то пошло не так'}
                    </div>
                    <div className="social">
                        <div className="soc-buttons">
                            <div className="soc-buttons__item">
                                <a href='https://twitter.com/aads_network' target='_blank'
                                   rel='noreferrer'
                                   aria-label="twitter"
                                >
                                    <IconTwitterRounded className="soc-icon"/>
                                </a>
                            </div>
                            <div className="soc-buttons__item">
                                <a href='https://t.me/aads_network' target='_blank'
                                   rel='noreferrer'
                                   aria-label="aads_network"
                                >
                                    <IconTelegramRounded className="soc-icon"/>
                                </a>
                            </div>
                            <div className="soc-buttons__item">
                                <a href='https://www.reddit.com/r/aadsnetwork/' target='_blank' aria-label="reddit"
                                   rel='noreferrer'>
                                    <IconRedditRounded className="soc-icon"/>
                                </a>
                            </div>
                            <div className="soc-buttons__item">
                                <a
                                    href='https://bitcointalk.org/index.php?topic=140822'
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-label="bitcointalk"
                                >
                                    <IconBitcoinTalkRounded className="soc-icon"/>
                                </a>
                            </div>

                            <div className="soc-buttons__item">
                                <a href='https://instagram.com/aads.network' target='_blank' rel='noreferrer'
                                   aria-label="instagram">
                                    <IconInstagramRounded className="soc-icon"/>
                                </a>
                            </div>

                            <div className="soc-buttons__item">
                                <a href='https://www.facebook.com/aads.network/' target='_blank'
                                   rel='noreferrer'
                                   aria-label="facebook"
                                >
                                    <IconFacebookRounded className="soc-icon"/>
                                </a>
                            </div>

                            <div className="soc-buttons__item">
                                <a
                                    href='https://www.linkedin.com/company/aads-network/'
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-label="linkedin"
                                >
                                    <IconLinkedinRounded className="soc-icon"/>
                                </a>
                            </div>
                        </div>
                        <div className="language-select"/>
                        <div className="copy">
                            <span className="copy__item">© AADS 2011-{currentYear}</span>
                            <a className="copy__item" href='https://aads.com/terms_of_service'>Terms of Service</a>
                            <a className="copy__item" href='https://aads.com/privacy_policy'>Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
