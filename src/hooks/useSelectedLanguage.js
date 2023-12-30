import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import i18n from '../utils/lang/i18n';

const useSelectedLanguage = () => {
  const selectedLanguage = useSelector((state) => state.appData.language);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);
};

export default useSelectedLanguage;
