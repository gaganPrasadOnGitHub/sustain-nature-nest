import React, {useRef} from 'react';
import './Footer.css';
import {useTranslation} from 'react-i18next';
import useSelectedLanguage from '../../hooks/useSelectedLanguage';
import useOutsideOrScrollHide from '../../hooks/useOutsideOrScrollHide';
import {useDispatch, useSelector} from 'react-redux';
import {setIsCreditMenuVisible} from '../../utils/redux/appSlice';
import {resourceLinks} from '../../utils/constants';

const Footer = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const dispatch = useDispatch();
  const isCreditMenuVisible = useSelector(
    (state) => state.appData.isCreditMenuVisible
  );
  const creditMenuRef = useRef(null);

  const toggleCreditMenu = (event) => {
    event.stopPropagation();
    dispatch(setIsCreditMenuVisible(!isCreditMenuVisible));
  };

  useOutsideOrScrollHide(creditMenuRef, () => {
    if (isCreditMenuVisible) {
      dispatch(setIsCreditMenuVisible(false));
    }
  });

  return (
    <div className="footer-container" ref={creditMenuRef}>
      <p> {t('common.sustainNatureNest')} </p>|
      <p>
        <a
          className="underline"
          href="https://cssbattle.dev/player/gagan"
          target="_blank"
          rel="noopener noreferrer"
        >
          GP
        </a>
      </p>
      |
      <p onClick={toggleCreditMenu} className="cursor-pointer">
        {t('common.credits')}
      </p>
      {isCreditMenuVisible && (
        <ul className="footer-credit-menu popup">
          <p className="text-subheading mb-16">{t('common.visitToKnowMore')}</p>
          {resourceLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Footer;
