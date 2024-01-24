import {useState, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {
  setAiSearchResult,
  setLoading,
  setError,
} from '../utils/redux/searchSlice';
import {validateImageUrl} from '../utils/helpers/validateImageUrl';
import {setIsImageSearchMenuVisible} from '../utils/redux/appSlice';
import useSelectedLanguage from './useSelectedLanguage';
import {useTranslation} from 'react-i18next';
import {searchWasteImage} from '../api/searchApi';
import {setSelectedBinId} from '../utils/redux/binSlice';

export const useImageSearch = () => {
  const {t} = useTranslation();
  useSelectedLanguage();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = useCallback(
    (event) => {
      if (event.target.files && event.target.files[0]) {
        setImageUrl('');
        const file = event.target.files[0];
        if (
          file.type.match(/image\/(jpeg|jpg|gif|png)$/i) &&
          file.size < 5 * 1024 * 1024
        ) {
          setSelectedImage(file);
          dispatch(setError(''));
        } else {
          setSelectedImage(file);
          dispatch(setError(t('error.invalidImageSize')));
        }
        setImageUrl('');
      }
    },
    [dispatch, t]
  );

  const handleImageUrlChange = useCallback(
    (event) => {
      const url = event.target.value;
      setImageUrl(url);
      if (url && !validateImageUrl(url)) {
        dispatch(setError(t('error.invalidImageUrl')));
      } else {
        dispatch(setError(''));
      }
    },
    [dispatch, t]
  );

  const handleImageSearch = useCallback(async () => {
    if (!selectedImage && !imageUrl) {
      dispatch(setError(t('error.emptySearch')));
      return;
    }

    const imageInput = imageUrl || selectedImage;

    dispatch(setLoading(true));
    try {
      const result = await searchWasteImage(imageInput);

      if (result.validItem) {
        dispatch(setAiSearchResult(result));
        dispatch(setError(''));
        dispatch(setSelectedBinId(result.binId));
        dispatch(setIsImageSearchMenuVisible(false));
        window.scrollTo(0, 0);
      } else {
        dispatch(setError(t('error.invalidItem')));
      }
    } catch (error) {
      dispatch(setError(t('error.searchResponse')));
    } finally {
      dispatch(setLoading(false));
    }
  }, [selectedImage, imageUrl, dispatch, t]);

  return {
    selectedImage,
    imageUrl,
    setImageUrl,
    handleImageChange,
    setSelectedImage,
    handleImageUrlChange,
    handleImageSearch,
  };
};
