import React, { useEffect, useState } from 'react';
import { Col, Modal, Button, Row, Form, Spinner } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  useGetGeneralQuery,
  useDeleteLaptopBrandMutation,
  useAddBrandMutation,
  useAddLinkMutation,
  useAddBannerMutation,
  useDeleteBannerMutation,
  useEditImagesMutation,
} from '../../../redux/api/GeneralApi';
import DeleteModel from '../../../components/DeleteModel';
import BasicTable from '../../../components/TableComponent';
import { MdDelete } from 'react-icons/md';
import { useEditCredentialsMutation } from '../../../redux/api/CredentialsApi';
import { HiUserCircle } from 'react-icons/hi';
import { getRole } from '../../../Constants/Global';
import FetchLoader from '../../../components/FetchLoader';
import NoAccess from '../../../components/NoAccess';
import { ChromePicker } from 'react-color';
import { useTheme } from '../../../Contexts/ThemeContext';
import { format } from 'date-fns';
import InputImageAndVideo from '../../../components/InputImageAndVideo';
import InputVideo from '../../../components/InputVideo';
import ImageVideoDragUpload from '../../../components/ImageVideoDragUpload';
import ServerError from '../../../components/ServerError';
import DragAndDropImageUpload from '../../../components/DragAndDropImageUpload';

const General = () => {
  const { color } = useTheme();
  const [deleteShow, setDeleteShow] = useState(false);
  const [laptopbranddeleteShow, setLaptopBrandDeleteShow] = useState(false);
  const [socialLinkdeleteShow, setsocialLinkDeleteShow] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState('');
  const [idToDelete, setIdToDelete] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imag, setImageKey] = useState('');
  const [editingSection, setEditingSection] = useState('');
  const [editingId, setEditingId] = useState(null);
  /* brand*/
  const [addBrandModal, setAddBrandModal] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandImage, setNewBrandImage] = useState(null);
  /*general banner*/
  const [addBannerModal, setAddBannerModal] = useState(false);
  const [newBannerImage, setNewBannerImage] = useState(null);
  /*rental banner*/
  const [rentalBannerModal, setRentalBannerModal] = useState(false);
  const [rentalBannerImage, setRentalBannerImage] = useState(null);
  const [rentalBannerId, setRentalBannerId] = useState(null);
  const [rentalBannerDeleteId, setRentalBannerDeleteId] = useState(null);
  const [rentalBannerDeleteShow, setRentalBannerDeleteShow] = useState(false);

  /*refurbished banner*/
  const [refurbishedBannerModal, setRefurbishedBannerModal] = useState(false);
  const [refurbishedBannerImage, setRefurbishedBannerImage] = useState(null);
  const [refurbishedBannerId, setRefurbishedBannerId] = useState(null);
  const [refurbishedBannerDeleteId, setRefurbishedBannerDeleteId] =
    useState(null);
  const [refurbishedBannerDeleteShow, setRefurbishedBannerDeleteShow] =
    useState(false);

  /*Modal banner*/
  const [modelBannerModal, setModelBannerModal] = useState(false);
  const [modelBannerImage, setModelBannerImage] = useState(null);
  const [modelBannerId, setModelBannerId] = useState(null);
  const [modelBannerDeleteId, setModelBannerDeleteId] = useState(null);
  const [modelBannerDeleteShow, setModelBannerDeleteShow] = useState(false);

  const [generalData, setGeneralData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [sociallinkData, setSocialLinkData] = useState([]);
  const [loading, setLoading] = useState(false);
  /* socail link*/
  const [addLinkModal, setAddLinkModal] = useState(false);
  const [newsocialMedia, setNewsocialMedia] = useState('');
  const [newLinkImage, setNewLinkImage] = useState(null);
  const [newsocialLink, setNewsocialLink] = useState('');
  /*initial amount*/
  const [initialshowModal, setInitialShowModal] = useState(false);
  const [initialAmount, setInitialAmount] = useState('');
  const [inputValue, setInputValue] = useState('');

  const role = getRole();
  const [read, setRead] = useState(false);
  const [write, setWrite] = useState(false);
  const [fullAccess, setFullAccess] = useState(false);
  const {
    data: imageData,
    refetch,
    isError,
    error,
    isLoading,
  } = useGetGeneralQuery({ role: role });
  const [editId, setEditId] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [editLinkShow, setEditLinkShow] = useState(false);

  const [credentials, setCredentials] = useState('');
  const [file, setFile] = useState('');
  const formatDateTime = (date) => format(new Date(date), 'dd-MMM-yyyy h:mm a');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectColorIndex, setSelectColorIndex] = useState(null);
  const [themeId, setThemeId] = useState(null);
  const [initialAmountId, setInitialAmountId] = useState(null);

  const [hasServerError, setHasServerError] = useState(false);

  const [editCredentialsData] = useEditCredentialsMutation();
  const [deleteLaptopBrandApi] = useDeleteLaptopBrandMutation();
  const [deleteBannerApi] = useDeleteBannerMutation();
  const [BrandAddData] = useAddBrandMutation();
  const [LinkAddData] = useAddLinkMutation();
  const [BannerAddData] = useAddBannerMutation();
  const [EditImagesData] = useEditImagesMutation();

  /*socail link yes or no states */
  const [toggle, setToggle] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    if (imageData && imageData.moduleAccess && imageData.data) {
      setRead(imageData.moduleAccess.read);
      setWrite(imageData.moduleAccess.write);
      setFullAccess(imageData.moduleAccess.fullAccess);
      setGeneralData(imageData.data[0]);
      setBrandData(imageData.data[0].laptop);
      setSocialLinkData(imageData.data[0].socialLinks);
      setInitialAmount(imageData.data[0].initialAmount.credentialsValue);
      setInitialAmountId(imageData.data[0].initialAmount._id);
    }
    if (isError && error?.status === 500) {
      setHasServerError(true);
    } else {
      setHasServerError(false);
    }
  }, [imageData, role, error, isError]);

  if (isLoading) return <FetchLoader />;

  if (
    !imageData ||
    !imageData.data ||
    !Array.isArray(imageData.data) ||
    imageData.data.length === 0
  ) {
    console.warn(
      'Image data is missing or not in the expected format:',
      imageData
    );
    return <p>No image data available</p>;
  }

  const handleEditClick = (section, index, id) => {
    setEditingSection(section);
    let key;
    if (section === 'logo') {
      key = `logo[${index}]`;
    } else if (section === 'generalBanner') {
      key = `generalBanner[${index}]`;
    } else if (section === 'rentalBanner') {
      key = `rentalBanner[${index}]`;
    } else if (section === 'refurbishedBanner') {
      key = `refurbishedBanner[${index}]`;
    } else if (section === 'modelBanner') {
      key = `modelBanner[${index}]`;
    } else if (section === 'video') {
      key = `video[${index}]`;
    }
    setImageKey(key);
    setEditingId(id);
    setRentalBannerId(id);
    setRefurbishedBannerId(id);
    setModelBannerId(id);
    setShowModal(true);
  };

  const deleteHandleClose = () => setDeleteShow(false);
  const RentalBannerDeleteHandleClose = () => setRentalBannerDeleteShow(false);
  const RefurbishedBannerDeleteHandleClose = () =>
    setRefurbishedBannerDeleteShow(false);
  const ModelBannerDeleteHandleClose = () => setModelBannerDeleteShow(false);
  const laptopBrandDeleteHandleClose = () => setLaptopBrandDeleteShow(false);

  /*general banner delete model function*/
  const deleteHandleShow = (id) => {
    setIndexToDelete(id);
    setDeleteShow(true);
  };

  /*rental banner delete model function*/
  const RentalBannerDeleteHandleShow = (id) => {
    setRentalBannerDeleteId(id);
    setRentalBannerDeleteShow(true);
  };

  /*refurbished banner delete model function*/
  const RefurbishedBannerDeleteHandleShow = (id) => {
    setRefurbishedBannerDeleteId(id);
    setRefurbishedBannerDeleteShow(true);
  };

  /*model banner delete model function*/
  const ModelBannerDeleteHandleShow = (id) => {
    setModelBannerDeleteId(id);
    setModelBannerDeleteShow(true);
  };

  /*laptop brand delete model function*/
  const LaptopBranddeleteHandleShow = (id) => {
    setIdToDelete(id);
    setLaptopBrandDeleteShow(true);
  };

  /*social links delete model function*/
  const SocialLinkdeleteHandleShow = (id) => {
    setIdToDelete(id);
    setsocialLinkDeleteShow(true);
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
  };

  const handleUpdateImage = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      const type =
        editingSection === 'logo'
          ? 'logo'
          : editingSection === 'generalBanner'
            ? 'generalBanner'
            : editingSection === 'rentalBanner'
              ? 'rentalBanner'
              : editingSection === 'refurbishedBanner'
                ? 'refurbishedBanner'
                : editingSection === 'modelBanner'
                  ? 'modelBanner'
                  : 'video';

      formData.append('type', type);
      formData.append('image', imageFile);

      let id;
      if (editingSection === 'rentalBanner') {
        id = rentalBannerId;
      } else if (editingSection === 'refurbishedBanner') {
        id = refurbishedBannerId;
      } else if (editingSection === 'modelBanner') {
        id = modelBannerId;
      } else {
        id = editingId;
      }

      const response = await EditImagesData({
        id: id,
        role: role,
        data: formData,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowModal(false);
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*  delete api functions */

  const DeleteBannerImage = async () => {
    try {
      const response = await deleteBannerApi({ id: indexToDelete, role: role });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setDeleteShow(false);
        setIndexToDelete('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setDeleteShow(false);
        setIndexToDelete('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function DeleteRentalBanner() {
    try {
      const response = await deleteBannerApi({
        id: rentalBannerDeleteId,
        role: role,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setRentalBannerDeleteShow(false);
        setIdToDelete('');
      } else {
        toast.error(response.error?.data.error, { autoClose: 1000 });
        setRentalBannerDeleteShow(false);
        setRentalBannerDeleteId('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteRefurbishedBanner() {
    try {
      const response = await deleteBannerApi({
        id: refurbishedBannerDeleteId,
        role: role,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setRefurbishedBannerDeleteShow(false);
        setRefurbishedBannerDeleteId('');
      } else {
        toast.error(response.error?.data.error, { autoClose: 1000 });
        setRefurbishedBannerDeleteShow(false);
        setRefurbishedBannerDeleteId('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function DeleteModelBanner() {
    try {
      const response = await deleteBannerApi({
        id: modelBannerDeleteId,
        role: role,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setModelBannerDeleteShow(false);
        setModelBannerDeleteId('');
      } else {
        toast.error(response.error?.data.error, { autoClose: 1000 });
        setModelBannerDeleteShow(false);
        setModelBannerDeleteId('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteLaptopBrand() {
    try {
      const response = await deleteLaptopBrandApi({
        id: idToDelete,
        role: role,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setLaptopBrandDeleteShow(false);
        setIdToDelete('');
      } else {
        toast.error(response.error?.data.error, { autoClose: 1000 });
        setLaptopBrandDeleteShow(false);
        setIdToDelete('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteSocialLink() {
    try {
      const response = await deleteLaptopBrandApi({
        id: idToDelete,
        role: role,
      });

      if (response?.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setsocialLinkDeleteShow(false);
        setIdToDelete('');
      } else {
        toast.error(response.error?.data.error, { autoClose: 1000 });
        setsocialLinkDeleteShow(false);
        setIdToDelete('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditShow = (id) => {
    const editData = generalData.laptop.find((d) => d._id === id);
    if (editData) {
      setEditId(id);
      setCredentials(editData.credentialsKey);
      setFile(editData.image);
      setEditShow(true);
    }
  };

  const handleEditClose = () => {
    setEditShow(false);
    setEditId(null);
    setCredentials('');
  };

  const handleCredentialsChange = (e) => {
    setCredentials(e.target.value);
  };

  const handleEditData = async () => {
    if (!credentials || !file) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('credentialsKey', credentials);
      formData.append('image', file);
      formData.append('type', 'laptopBrands');

      const response = await editCredentialsData({
        id: editId,
        data: formData,
        role: role,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditShow(false);
        window.location.reload();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleAddBrandClick = () => {
    setAddBrandModal(true);
  };

  const handleAddBrandClose = () => {
    setAddBrandModal(false);
    setNewBrandName('');
    setNewBrandImage(null);
  };

  const handleNewBrandImageUpload = (file) => {
    setNewBrandImage(file);
  };
  const allowedSocialMediaNames = ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube','Whatsapp','Email'];
  const handleAddLinkSubmit = async () => {
    if (!newsocialMedia || !newLinkImage || !newsocialLink) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    const urlPattern = new RegExp('https?://.+');
    if (!urlPattern.test(newsocialLink)) {
      toast.error('Please enter a valid URL', { autoClose: 1000 });
      return;
    }

    if (!allowedSocialMediaNames.includes(newsocialMedia)) {
      toast.error('Please select a valid social media platform', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('type', 'socialLinks');
      formData.append('image', newLinkImage);
      formData.append('credentialsKey', newsocialMedia);
      formData.append('credentialsValue', newsocialLink);

      const response = await LinkAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setAddLinkModal(false);
        setNewLinkImage(null);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setNewLinkImage(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLinkShow = (id) => {
    const editData = generalData.socialLinks.find((d) => d._id === id);
    if (editData) {
      setEditId(id);
      setNewsocialMedia(editData.credentialsKey);
      setNewsocialLink(editData.credentialsValue);
      setNewLinkImage(editData.image);
      setEditLinkShow(true);
    }
  };

  /* Socail link */

  const handleEditLinkData = async () => {
    const urlPattern = new RegExp('https?://.+');
    if (!urlPattern.test(newsocialLink)) {
      toast.error('Please enter a valid URL', { autoClose: 1000 });
      return;
    }
    if (!newsocialMedia || !newsocialLink || !newLinkImage) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('credentialsKey', newsocialMedia);
      formData.append('credentialsValue', newsocialLink);
      formData.append('image', newLinkImage);
      formData.append('type', 'socialLinks');

      const response = await editCredentialsData({
        id: editId,
        data: formData,
        role: role,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setEditLinkShow(false);
        window.location.reload();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* social like yes or no function */
  const handleCheckboxClick = (rowIdx, check) => {
    setSelectedRowId(rowIdx);
    setShowConfirmationModal(true);
    setToggle(check);
  };

  /* Socail link  yes or no */

  const handleEditLinksData = async () => {
    setLoading(true);
    const toggledValue = toggle === 'yes' ? 'no' : 'yes';
    try {
      const data = {
        status: toggledValue,
        type: 'socialLinks',
      };

      const response = await editCredentialsData({
        id: selectedRowId,
        data: data,
        role: role,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowConfirmationModal(false);
        refetch();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowConfirmationModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLinkClose = () => {
    setEditLinkShow(false);
    setEditId(null);
    setNewsocialMedia('');
    setNewsocialLink('');
    setNewLinkImage(null);
  };

  const handleAddLinkClose = () => {
    setAddLinkModal(false);
    setNewsocialLink('');
    setNewsocialMedia('');
    setNewLinkImage(null);
  };

  const handleAddLinkClick = () => {
    setAddLinkModal(false);
    setNewsocialLink('');
    setNewsocialMedia('');
    setNewLinkImage(null);
    setAddLinkModal(true);
  };

  const handleNewSocialLinkImageUpload = (file) => {
    setNewLinkImage(file);
  };

  const handleSocialMediaChange = (e) => {
    setNewsocialMedia(e.target.value);
  };
  const handleSocialLinkChange = (e) => {
    setNewsocialLink(e.target.value);
  };

  const handleAddBrandSubmit = async () => {
    if (!newBrandImage || !newBrandName) {
      toast.error('Please fill all the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('type', 'laptopBrands');
      formData.append('image', newBrandImage);
      formData.append('credentialsKey', newBrandName);
      formData.append('credentialsValue', newBrandName);

      const response = await BrandAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        handleAddBrandClose();
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*general banner functions */

  const handleAddBannerClick = () => {
    setAddBannerModal(true);
  };

  const handleAddBannerClose = () => {
    setAddBannerModal(false);
    setNewBannerImage(null);
  };

  const handleNewBannerImageUpload = (file) => {
    setNewBannerImage(file);
  };

  const handleAddBannerSubmit = async () => {
    if (!newBannerImage) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'generalBanner');
      formData.append('image', newBannerImage);

      const response = await BannerAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setAddBannerModal(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*rental banner functions */

  const handleAddRentalBannerClick = () => {
    setRentalBannerModal(true);
  };

  const handleAddRentalBannerClose = () => {
    setRentalBannerModal(false);
    setRentalBannerImage(null);
  };

  const handleNewRentalBannerImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const minWidth = 1200;
        const minHeight = 250;

        if (imgWidth < minWidth || imgHeight < minHeight) {
          toast.error(
            `Image must be at least ${minWidth}px by ${minHeight}px`,
            {
              autoClose: 2000,
            }
          );
        } else {
          setRentalBannerImage(file);
        }
      };

      img.onerror = () => {
        toast.error('Error loading image file. Please try again.', {
          autoClose: 2000,
        });
      };
    };

    reader.readAsDataURL(file);
  };

  const handleAddRentalBannerSubmit = async () => {
    if (!rentalBannerImage) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'rentalBanner');
      formData.append('image', rentalBannerImage);

      const response = await BannerAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setRentalBannerModal(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*refurbished Banner functions */

  const handleAddRefurbishedBannerClick = () => {
    setRefurbishedBannerModal(true);
  };

  const handleAddRefurbishedBannerClose = () => {
    setRefurbishedBannerModal(false);
    setRefurbishedBannerImage(null);
  };

  const handleNewRefurbishedBannerImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const minWidth = 1200;
        const minHeight = 250;

        if (imgWidth < minWidth || imgHeight < minHeight) {
          toast.error(
            `Image must be at least ${minWidth}px by ${minHeight}px`,
            {
              autoClose: 2000,
            }
          );
        } else {
          setRefurbishedBannerImage(file);
        }
      };

      img.onerror = () => {
        toast.error('Error loading image file. Please try again.', {
          autoClose: 2000,
        });
      };
    };

    reader.readAsDataURL(file);
  };

  const handleAddRefurbishedBannerSubmit = async () => {
    if (!refurbishedBannerImage) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'refurbishedBanner');
      formData.append('image', refurbishedBannerImage);

      const response = await BannerAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setRefurbishedBannerModal(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /*model banner functions */

  const handleAddmodelBannerClick = () => {
    setModelBannerModal(true);
  };

  const handleAddmodelBannerClose = () => {
    setModelBannerModal(false);
    setModelBannerImage(null);
  };

  const handleNewmodelBannerImageUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const minWidth = 700;
        const minHeight = 230;

        if (imgWidth < minWidth || imgHeight < minHeight) {
          toast.error(
            `Image must be at least ${minWidth}px by ${minHeight}px`,
            {
              autoClose: 2000,
            }
          );
        } else {
          setModelBannerImage(file);
        }
      };

      img.onerror = () => {
        toast.error('Error loading image file. Please try again.', {
          autoClose: 2000,
        });
      };
    };

    reader.readAsDataURL(file);
  };

  const handleAddmodelBannerSubmit = async () => {
    if (!modelBannerImage) {
      toast.error('Please fill the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'modelBanner');
      formData.append('image', modelBannerImage);

      const response = await BannerAddData({
        role: role,
        data: formData,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setModelBannerModal(false);
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
      minWidth: 10,
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: (props) => {
        const imageUrl = props.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{ maxWidth: '50px', maxHeight: '50px' }}
          />
        ) : (
          <HiUserCircle size={30} />
        );
      },
    },
    {
      Header: 'Name',
      accessor: 'credentialsKey',
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDateTime(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDateTime(value),
    },
  ];

  if (fullAccess) {
    COLUMNS.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button variant="warning" onClick={() => handleEditShow(rowIdx)}>
              <FaEdit />
            </Button>
            <Button
              variant="danger"
              className="ms-2"
              onClick={() => LaptopBranddeleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button>
          </div>
        );
      },
    });
  }

  const COLUMNSS = [
    {
      Header: 'ID',
      accessor: (d, i) => i + 1,
      minWidth: 10,
    },
    {
      Header: 'Image',
      accessor: 'image',
      Cell: (props) => {
        const imageUrl = props.value;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            style={{ maxWidth: '50px', maxHeight: '50px' }}
          />
        ) : (
          <HiUserCircle size={30} />
        );
      },
    },
    {
      Header: 'Social Media',
      accessor: 'credentialsKey',
    },
    {
      Header: 'Social Link',
      accessor: 'credentialsValue',
    },
    {
      Header: 'Created At',
      accessor: 'createdAt',
      Cell: ({ value }) => formatDateTime(value),
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDateTime(value),
    },
  ];

  if (fullAccess) {
    COLUMNSS.push({
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: (props) => {
        const rowIdx = props.row.original._id;
        const status = props.row.original.status;
        const isToggled = status === 'yes';

        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Button
              variant={isToggled ? 'success' : 'secondary'}
              onClick={() => handleCheckboxClick(rowIdx, status)}
              className="ms-2"
            >
              {isToggled ? 'ON' : 'OFF'}
            </Button>
            <Button
              variant="warning"
              className="ms-2"
              onClick={() => handleEditLinkShow(rowIdx)}
            >
              <FaEdit />
            </Button>
            {/* <Button
              variant="danger"
              className="ms-2"
              onClick={() => SocialLinkdeleteHandleShow(rowIdx)}
            >
              <MdDelete />
            </Button> */}
          </div>
        );
      },
    });
  }

  const handleColorEditClick = (index) => {
    setSelectColorIndex(index);
    setSelectedColor(generalData.theme[index].credentialsValue);
    setThemeId(generalData.theme[index]._id);
    setShowColorPicker(true);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleColorUpdate = async () => {
    setLoading(true);
    try {
      const updatedTheme = [...generalData.theme];
      updatedTheme[selectColorIndex] = {
        ...updatedTheme[selectColorIndex],
        credentialsValue: selectedColor,
      };

      const response = await editCredentialsData({
        id: themeId,
        data: {
          credentialsValue: selectedColor,
          type: 'theme',
        },
        role: role,
      });

      if (response.data) {
        toast.success(response.data.message, { autoClose: 1000 });
        setShowColorPicker(false);
        setGeneralData({ ...generalData, theme: updatedTheme });
        window.location.reload();
      } else {
        toast.error(response.error.data.error, { autoClose: 1000 });
        setShowColorPicker(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelColor = () => {
    setShowColorPicker(false);
  };

  const handleInitialAmountClick = () => {
    setInputValue(initialAmount);
    setInitialShowModal(true);
  };

  const handleInitialAmountSubmit = async () => {
    if (!inputValue) {
      toast.error('Please fill  the fields', { autoClose: 1000 });
      return;
    }
    setLoading(true);

    try {
      const data = {
        type: 'initialAmount',
        credentialsValue: inputValue,
      };
      const response = await EditImagesData({
        id: initialAmountId,
        role: role,
        data: data,
      });

      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        setInitialShowModal(false);
        setInputValue('');
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
        setInputValue('');
        setInitialShowModal(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <FetchLoader />
      ) : (
        <>
          {hasServerError ? (
            <ServerError />
          ) : read ? (
            <>
              {' '}
              <Col>
                <Row className="mb-4 mt-4">
                  <Col className="d-flex flex-row justify-content-between mt-1">
                    <h4 className="fw-bold">General Settings</h4>
                  </Col>
                </Row>
                <Col className="d-flex flex-row justify-content-between mt-5">
                  <h4
                    className="fw-bold"
                    style={{ color: color, border: 'none' }}
                  >
                    INITIAL AMOUNT:
                  </h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="mb-4"
                        onClick={handleInitialAmountClick}
                      >
                        <FaEdit size={20} />
                        <span className="d-none d-md-inline"> Update</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col xs={12} xl={4} l={6} className="mt-3 p-4">
                  <Form.Label>Amount:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter initial amount"
                    value={initialAmount}
                    onChange={(e) => setInitialAmount(e.target.value)}
                    disabled
                    className="mb-4"
                  />
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <div>
                    <h4
                      className="fw-bold"
                      style={{ color: color, border: 'none' }}
                    >
                      LOGO:
                    </h4>
                    <p>Dimensions should be 1:1</p>
                  </div>
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.logo &&
                    generalData.logo.map((logoItem, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={logoItem.image}
                          alt={`Logo ${index + 1}`}
                          style={{
                            margin: '15px',
                            height: '200px',
                            width: '100%',
                            maxWidth: '350px',
                          }}
                        />
                        {fullAccess && (
                          <div className="icon-container">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setImageFile(logoItem.image);
                                handleEditClick('logo', index, logoItem._id);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <h4
                    className="fw-bold"
                    style={{ color: color, border: 'none' }}
                  >
                    COLOR THEME:
                  </h4>
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.theme &&
                    generalData.theme.map((themeItem, index) => (
                      <div key={index} className="image-container">
                        <div
                          className="color-box"
                          style={{
                            backgroundColor: themeItem.credentialsValue,
                            margin: '15px',
                            height: '200px',
                            width: '220px',
                            maxWidth: '350px',
                          }}
                        />
                        {fullAccess && (
                          <div className="icon-container">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => handleColorEditClick(index)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </Col>

                {/* Color Picker Modal */}
                {showColorPicker && (
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: '2',
                      top: '1000px',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <ChromePicker
                      color={selectedColor}
                      onChange={handleColorChange}
                    />

                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      className="m-4"
                      onClick={handleCancelColor}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      onClick={handleColorUpdate}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Updating...
                        </>
                      ) : (
                        'Update'
                      )}
                    </Button>
                  </div>
                )}

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <h4
                    className="fw-bold"
                    style={{ color: color, border: 'none' }}
                  >
                    VIDEO:
                  </h4>
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.video &&
                    generalData.video.map((videoItem, index) => (
                      <div key={index} className="image-container">
                        <video
                          src={videoItem.image}
                          alt={`Video ${index + 1}`}
                          controls
                          style={{
                            margin: '15px',
                            height: '200px',
                            width: '100%',
                            maxWidth: '350px',
                          }}
                        />
                        {fullAccess && (
                          <div className="icon-container">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setImageFile(videoItem.image);
                                handleEditClick('video', index, videoItem._id);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <h4
                    className="fw-bold"
                    style={{ color: color, border: 'none' }}
                  >
                    GENERAL BANNER:
                  </h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddBannerClick}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Banner</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.generalBanner &&
                    generalData.generalBanner.map((banner, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={banner.image}
                          alt={`Banner ${index + 1}`}
                          style={{
                            margin: '15px',
                            height: '200px',
                            width: '100%',
                            maxWidth: '350px',
                          }}
                        />
                        {fullAccess && (
                          <div className="icon-container">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setImageFile(banner.image);
                                handleEditClick(
                                  'generalBanner',
                                  index,
                                  banner._id
                                );
                              }}
                            />
                            <FaTrash
                              className="delete-icon deleteicon-container"
                              onClick={() => deleteHandleShow(banner._id)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <div>
                    <h4
                      className="fw-bold"
                      style={{ color: color, border: 'none' }}
                    >
                      RENTAL BANNER:
                    </h4>
                    <p>Dimensions should be (1200px * 250px)</p>
                  </div>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddRentalBannerClick}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Banner</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.rentalBanner &&
                    generalData.rentalBanner.map((rentalBanner, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={rentalBanner.image}
                          alt={`Banner ${index + 1}`}
                          style={{
                            margin: '15px',
                            height: '200px',
                            width: '100%',
                            maxWidth: '350px',
                          }}
                        />
                        {fullAccess && (
                          <div className="icon-container">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setImageFile(rentalBanner.image);
                                handleEditClick(
                                  'rentalBanner',
                                  index,
                                  rentalBanner._id
                                );
                              }}
                            />
                            <FaTrash
                              className="delete-icon deleteicon-container"
                              onClick={() =>
                                RentalBannerDeleteHandleShow(rentalBanner._id)
                              }
                            />
                          </div>
                        )}
                      </div>
                    ))}
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <div>
                    <h4
                      className="fw-bold"
                      style={{ color: color, border: 'none' }}
                    >
                      REFURBISHED BANNER:
                    </h4>
                    <p>Dimensions should be (1200px * 250px)</p>
                  </div>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddRefurbishedBannerClick}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Banner</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.refurbishedBanner &&
                    generalData.refurbishedBanner.map(
                      (refurbishedBanner, index) => (
                        <div key={index} className="image-container">
                          <img
                            src={refurbishedBanner.image}
                            alt={`Banner ${index + 1}`}
                            style={{
                              margin: '15px',
                              height: '200px',
                              width: '100%',
                              maxWidth: '350px',
                            }}
                          />
                          {fullAccess && (
                            <div className="icon-container">
                              <FaEdit
                                className="edit-icon"
                                onClick={() => {
                                  setImageFile(refurbishedBanner.image);
                                  handleEditClick(
                                    'refurbishedBanner',
                                    index,
                                    refurbishedBanner._id
                                  );
                                }}
                              />
                              <FaTrash
                                className="delete-icon deleteicon-container"
                                onClick={() =>
                                  RefurbishedBannerDeleteHandleShow(
                                    refurbishedBanner._id
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                      )
                    )}
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <h4
                    className="fw-bold"
                    style={{ color: color, border: 'none' }}
                  >
                    MOST BOOKED SERVICE BANNER:
                  </h4>
                  {write ? (
                    <div>
                      {/* <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="p-2 m-1"
                        onClick={handleAddmodelBannerClick}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add Banner</span>
                      </Button> */}
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col
                  xs={12}
                  className="mt-3 d-flex flex-row flex-wrap justify-content-start align-items-center"
                >
                  {generalData.modelBanner &&
                    generalData.modelBanner.map((modelBanner, index) => (
                      <div key={index} className="image-container">
                        <img
                          src={modelBanner.image}
                          alt={`Banner ${index + 1}`}
                          style={{
                            margin: '15px',
                            height: '200px',
                            width: '100%',
                            maxWidth: '350px',
                          }}
                        />
                        {fullAccess && (
                          <div className="icon-container">
                            <FaEdit
                              className="edit-icon"
                              onClick={() => {
                                setImageFile(modelBanner.image);
                                handleEditClick(
                                  'modelBanner',
                                  index,
                                  modelBanner._id
                                );
                              }}
                            />
                            {/* <FaTrash
                              className="delete-icon deleteicon-container"
                              onClick={() =>
                                ModelBannerDeleteHandleShow(modelBanner._id)
                              }
                            /> */}
                          </div>
                        )}
                      </div>
                    ))}
                </Col>

                <Col className="d-flex flex-row justify-content-between mt-5">
                  <h4
                    className="fw-bold"
                    style={{ color: color, border: 'none' }}
                  >
                    LAPTOP BRAND:
                  </h4>
                  {write ? (
                    <div>
                      <Button
                        style={{ backgroundColor: color, border: 'none' }}
                        className="mb-4"
                        onClick={handleAddBrandClick}
                      >
                        <FaPlus size={20} />
                        <span className="d-none d-md-inline"> Add brand</span>
                      </Button>
                    </div>
                  ) : (
                    <></>
                  )}
                </Col>
                <Col xs={12} className="mt-3 p-4 boxShadow">
                  <BasicTable COLUMNS={COLUMNS} MOCK_DATA={brandData} />
                </Col>
              </Col>
              <Col className="d-flex flex-row justify-content-between mt-5">
                <h4
                  className="fw-bold"
                  style={{ color: color, border: 'none' }}
                >
                  SocialLinks:
                </h4>
                {write ? (
                  <div>
                    <Button
                      style={{ backgroundColor: color, border: 'none' }}
                      className="mb-4"
                      onClick={handleAddLinkClick}
                    >
                      <FaPlus size={20} />
                      <span className="d-none d-md-inline"> Add Link</span>
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </Col>
              <Col xs={12} className="mt-3 p-4 boxShadow">
                <BasicTable COLUMNS={COLUMNSS} MOCK_DATA={sociallinkData} />
              </Col>
            </>
          ) : (
            <NoAccess />
          )}
        </>
      )}

      {/* Image Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Update{' '}
            {editingSection === 'logo'
              ? 'Logo'
              : editingSection === 'generalBanner'
                ? ' GeneralBanner'
                : editingSection === 'rentalBanner'
                  ? ' RentalBanner'
                  : editingSection === 'refurbishedBanner'
                    ? ' Refurbished Banner'
                    : editingSection === 'modelBanner'
                      ? ' Model Banner'
                      : 'Video'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          {/* <Form.Control
            id="file-upload"
            type="file"
            accept={
              editingSection === 'video'
                ? '.mp4,.mov,.mkv,.webm,.avi'
                : '.jpg,.jpeg,.png,.svg,.webp'
            }
            onChange={handleImageUpload}
          /> */}
          {editingSection === 'video' ? (
            <>
              <ImageVideoDragUpload
                labelText="Upload File"
                accepts={{
                  'image/*': ['.gif'],
                  'video/*': ['.mp4', '.avi', '.mov', '.mkv'],
                }}
                handleFileChange={(file) => {
                  handleImageUpload(file);
                }}
              />
              <div>
                <small className="text-muted">
                  Accepted file types: .gif,
                  .mp4, .avi, .mov, .mkv
                </small>
              </div>
            </>
          ) : (
            <>
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
              handleFileChange={(file) => {
                handleImageUpload(file);
              }}
            />
             <div>
            <small className="text-muted">
              Accepted file types: .jpg, .jpeg, .png, .svg, .webp, .gif
            </small>
          </div>
              </>
          )}
          
         

          {editingSection === 'video' ? (
            <InputVideo video={imageFile} valueVideo={imageFile} />
          ) : (
            <InputImageAndVideo image={imageFile} valueImage={imageFile} />
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleUpdateImage}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* general banner delete model */}
      <DeleteModel
        YES={DeleteBannerImage}
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this General Banner"
        DELETETITLE="General Banner"
      />

      {/* rental banner delete model */}

      <DeleteModel
        YES={DeleteRentalBanner}
        DELETESTATE={rentalBannerDeleteShow}
        ONCLICK={RentalBannerDeleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this Rental Banner"
        DELETETITLE="Rental Banner"
      />

      {/* refurbished banner delete model */}

      <DeleteModel
        YES={DeleteRefurbishedBanner}
        DELETESTATE={refurbishedBannerDeleteShow}
        ONCLICK={RefurbishedBannerDeleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this Refurbished Banner"
        DELETETITLE="Refurbished Banner"
      />

      {/* model banner delete model */}

      <DeleteModel
        YES={DeleteModelBanner}
        DELETESTATE={modelBannerDeleteShow}
        ONCLICK={ModelBannerDeleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this Most Booked Service Banner"
        DELETETITLE=" Most Booked Service Banner"
      />

      {/* laptop brand delete model */}

      <DeleteModel
        YES={deleteLaptopBrand}
        DELETESTATE={laptopbranddeleteShow}
        ONCLICK={laptopBrandDeleteHandleClose}
        DESCRIPTION="Are you sure you want to delete this Brand"
        DELETETITLE="Laptop Brand"
      />

      {/* social links delete model */}

      <DeleteModel
        YES={deleteSocialLink}
        DELETESTATE={socialLinkdeleteShow}
        ONCLICK={() => setsocialLinkDeleteShow(false)}
        DESCRIPTION="Are you sure you want to delete this Link"
        DELETETITLE="Social Link"
      />

      {/* edit Brand Modal */}

      <Modal show={editShow} onHide={handleEditClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fileUpload" className="mt-3 mb-3">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleFileChange(file);
                }}
              />
              <div>
                <small className="text-muted">
                  Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
                </small>
              </div>

              <InputImageAndVideo image={file} valueImage={file} />
            </Form.Group>

            <Form.Group controlId="CredentialsInput" className="mt-3">
              <Form.Label>
                Credentials Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={credentials}
                onChange={handleCredentialsChange}
                placeholder="Enter the carousel name here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleEditData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* edit Link Modal */}

      <Modal show={editLinkShow} onHide={handleEditLinkClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="fileUpload" className="mt-3 mb-3">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewSocialLinkImageUpload(file);
                }}
              />
              <div>
                <small className="text-muted">
                  Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
                </small>
              </div>

              <InputImageAndVideo
                image={newLinkImage}
                valueImage={newLinkImage}
              />
            </Form.Group>

            <Form.Group controlId="CredentialsInput " className="mt-3">
              <Form.Label>
                Social Media<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={newsocialMedia}
                onChange={handleSocialMediaChange}
                placeholder="Enter the soacial media here"
              />
            </Form.Group>
            <Form.Group controlId="CredentialsInput" className="mt-3">
              <Form.Label>
                Social Link<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                pattern="https?://.+"
                required
                value={newsocialLink}
                onChange={handleSocialLinkChange}
                placeholder="Enter the social link here"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditLinkClose}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleEditLinkData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Brand Modal */}
      <Modal show={addBrandModal} onHide={handleAddBrandClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="carouselName" className="mb-3">
              <Form.Label>
                Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the carousel name here"
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="carouselImage">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewBrandImageUpload(file);
                }}
              />
              <div>
                <small className="text-muted">
                  Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
                </small>
              </div>

              <InputImageAndVideo
                image={newBrandImage}
                valueImage={newBrandImage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddBrandClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddBrandSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding Brand...
              </>
            ) : (
              'Add Brand'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add SocailLink Modal */}
      <Modal show={addLinkModal} onHide={handleAddLinkClose} centered dialogClassName="all-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add SocialLink</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="carouselImage">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewSocialLinkImageUpload(file);
                }}
              />
              <div>
                <small className="text-muted">
                  Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
                </small>
              </div>
              <InputImageAndVideo
                image={newLinkImage}
                valueImage={newLinkImage}
              />
            </Form.Group>

            <Form.Group controlId="carouselName" className="mt-3">
              <Form.Label>
                Social Media<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the social media here"
                value={newsocialMedia}
                onChange={(e) => setNewsocialMedia(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="carouselName" className="mt-3">
              <Form.Label>
                Social Link<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                pattern="https?://.+"
                type="url"
                placeholder="Enter the soacial link here"
                value={newsocialLink}
                onChange={(e) => setNewsocialLink(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddLinkClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={() => {
              handleAddLinkSubmit();
            }}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding Link...
              </>
            ) : (
              'Add Link'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding generalbanner */}
      <Modal show={addBannerModal} onHide={handleAddBannerClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add General Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="bannerImage">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewBannerImageUpload(file);
                }}
              />
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
              </small>

              <InputImageAndVideo
                image={newBannerImage}
                valueImage={newBannerImage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddBannerClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddBannerSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding Banner...
              </>
            ) : (
              ' Add Banner'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding rentalbanner */}

      <Modal
        show={rentalBannerModal}
        onHide={handleAddRentalBannerClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Rental Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rentalBannerImage">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewRentalBannerImageUpload(file);
                }}
              />
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
              </small>

              <InputImageAndVideo
                image={rentalBannerImage}
                valueImage={rentalBannerImage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddRentalBannerClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddRentalBannerSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding Banner...
              </>
            ) : (
              ' Add Banner'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding refurbishedBanner */}

      <Modal
        show={refurbishedBannerModal}
        onHide={handleAddRefurbishedBannerClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Refurbished Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rentalBannerImage">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewRefurbishedBannerImageUpload(file);
                }}
              />
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
              </small>

              <InputImageAndVideo
                image={refurbishedBannerImage}
                valueImage={refurbishedBannerImage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddRefurbishedBannerClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddRefurbishedBannerSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding Banner...
              </>
            ) : (
              ' Add Banner'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for adding modelBanner */}

      <Modal
        show={modelBannerModal}
        onHide={handleAddmodelBannerClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add model Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rentalBannerImage">
            <DragAndDropImageUpload
              labelText="Upload File"
              accepts={{
                'image/*': ['.png', '.jpeg', '.jpg', '.svg', '.webp', '.gif'],
              }}
                handleFileChange={(file) => {
                  handleNewmodelBannerImageUpload(file);
                }}
              />
              <small className="text-muted">
                Accepted file types: .jpg , .jpeg, .png, .svg, .webp, .gif
              </small>

              <InputImageAndVideo
                image={modelBannerImage}
                valueImage={modelBannerImage}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddmodelBannerClose}>
            Close
          </Button>
          <Button
            style={{ backgroundColor: color, border: 'none' }}
            onClick={handleAddmodelBannerSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding Banner...
              </>
            ) : (
              ' Add Banner'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing initial amount */}
      <Modal
        show={initialshowModal}
        onHide={() => setInitialShowModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formInput">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter amount"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setInitialShowModal(false)}
          >
            Close
          </Button>
          <Button
            style={{ backgroundColor: color }}
            onClick={handleInitialAmountSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Updating...
              </>
            ) : (
              ' Update'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal for yes or no in socail links*/}
      <Modal
        show={showConfirmationModal}
        onHide={() => setShowConfirmationModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update ?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmationModal(false)}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: color }}
            onClick={handleEditLinksData}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Confirm...
              </>
            ) : (
              'Confirm'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default General;
