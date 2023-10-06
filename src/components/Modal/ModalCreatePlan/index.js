import './styles.scss';
import {
  Modal,
  Form,
  Input,
  DatePicker,
  Col,
  Row,
  Select,
  Radio,
  Button,
  Popover
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomCkeditor from '../../../containers/screens/MainTable/editor/CustomCKEditor';
import DragDropList from 'components/List/DragDrop/index';
import moment from 'moment';
import {
  FREE_CODE,
  MONTH_CODE,
  MONTH_VALUE,
  PRECIOUS_CODE,
  PRECIOUS_VALUE,
  WEEK_CODE,
  WEEK_VALUE,
  YEAR_CODE,
  YEAR_VALUE,
} from './constants';
import { v4 as uuidv4 } from 'uuid';
import Step from 'components/Step/index';
// import { BiReplyAll } from 'react-icons/bi';
// import UserApi from 'components/Field/FieldPerson/UserApi';
import personIcon from 'assets/icons/person.png';
import groupPersonIcon from '../../../assets/icons/group-person.png'
import addUserIcon from '../../../assets/icons/add-user.png'
import searchIcon from '../../../assets/icons/search.png'
import avaterPerson from '../../../assets/images/avater-demo.png'
import Icon from 'components/Icon';
import closeIcon from 'assets/icons/close-modal.png';
import unionIcon from '../../../assets/icons/union-delete.png'

// const { RangePicker } = DatePicker;
const { Option } = Select;

function ModalCreatePlan({ visible, setVisible, defaultName = '' }) {
  //#region Properties

  // Translation
  const { t } = useTranslation();

  // Date format
  const dateFormat = 'DD/MM/YYYY';

  // Current step
  const [currentStep, setCurrentStep] = useState(1);

  // Is on use once
  const [isOnUseOnce, setIsOnUseOne] = useState(true);

  // List phase
  const [listPhase, setListPhase] = useState([]);

  // Form data
  const [formData, setFormData] = useState(null);

  // List staff
  const [listStaff, setListStaff] = useState([
    {
      id: 1,
      name: "Tùng",
      type: 'person'
    },
    {
      id: 2,
      name: "Nhóm dev",
      type: 'group'
    },
    {
      id: 3,
      name: "Nhân viên 2",
      type: 'person'
    },
    {
      id: 4,
      name: "Nhân viên 4",
      type: 'person'
    }
  ]);

  const [listSelectedStaff, setListSelectedStaff] = useState([
    {
      id: 1,
      name: "Tùng",
      type: 'person'
    },
    {
      id: 2,
      name: "Nhóm dev",
      type: 'group'
    },
    {
      id: 3,
      name: "Nhân viên 2",
      type: 'person'
    }
  ])

  // List role
  const [listRole, setListRole] = useState([
    {
      id: 1,
      name: "Vai trò 1"
    },
    {
      id: 2,
      name: "Vai trò 2"
    },
    {
      id: 3,
      name: "Vai trò 3"
    }
  ]);

  // Init form
  const [form] = Form.useForm();

  const [filterStaff, setFilterStaff] = useState('')


  // const fetchListPerson = useCallback(async () => {
  //   const listPersonResult = await UserApi.listPersons({
  //     page: 1,
  //     perPage: 500,
  //   });

  //   setListStaff(listPersonResult?.data);
  // }, []);

  // useEffect(() => {
  //   if (visible) {
  //     fetchListPerson();
  //   }
  // }, [visible]);

  // Next step
  const nextStep = () => {
    if (currentStep < 3) {
      setFormData({ ...formData, ...form.getFieldsValue() });
      setCurrentStep(currentStep + 1);
    }

    return;
  };

  // Previous step
  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }

    return;
  };

  // Handle schedule change
  const handleScheduleChange = (event) => {
    let plusDays;
    setIsOnUseOne(true);

    switch (event?.target?.value) {
      // Week case
      case WEEK_CODE: {
        plusDays = WEEK_VALUE;
        break;
      }

      // Month case
      case MONTH_CODE: {
        plusDays = MONTH_VALUE;
        break;
      }

      // Quy case
      case PRECIOUS_CODE: {
        plusDays = PRECIOUS_VALUE;
        break;
      }

      // Year case
      case YEAR_CODE: {
        plusDays = YEAR_VALUE;
        break;
      }

      // Free case
      case FREE_CODE: {
        setIsOnUseOne(false);
        break;
      }

      default:
        break;
    }

    if (!plusDays) {
      return;
    }

    // const currentValue = form.getFieldValue(['scheduleDueDate']);

    // const startDate = currentValue?.[0];
    // const endDate = moment(startDate).add(plusDays, 'days');

    // form.setFieldsValue({
    //   scheduleDueDate: [startDate, endDate],
    // });
  };

  // Disable date
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  };

  // Add phase
  const addPhase = () => {
    const phase = {};
    phase.title = form.getFieldValue(['phaseName']);
    phase.description = form.getFieldValue(['phaseDescription']);
    phase.id = uuidv4();

    if(phase.title && phase.description){
      setListPhase([...listPhase, phase]);
    }

    return;
  };

  // Handle Ckeditor Change
  const handleCkeditorChange = (value, name) => {
    const setValue = {};
    setValue[name] = value;

    form.setFieldsValue(setValue);

    return;
  };

  // Remove item list
  const removePhase = (index) => {
    listPhase.splice(index, 1);

    setListPhase([...listPhase]);
    return;
  };

  const handleDeleteSelectedStaff = (staff) => {
    setListSelectedStaff([...listSelectedStaff.filter(el => el?.id != staff.id )])
  }

  const handleAddToListSelectedStaff = (staff) => {
    if(!listSelectedStaff.find(el => el?.id == staff.id)){
      setListSelectedStaff([...listSelectedStaff, staff])
    }
  }

  // Submit form
  const submitForm = () => {
    let validationPromise;
    switch (currentStep) {
      case 1: {
        validationPromise = form.validateFields([
          'name',
          'dueDateFrom',
          'dueDateTo',
          'specifyRole'
        ]);

        break;
      }

      case 2: {
        validationPromise = form.validateFields([
          'schedule',
          'startDate',
          'endDate',
          // 'scheduleDueDate',
        ]);

        break;
      }

      case 3: {
        // Submit form go here
        const result = { ...formData };
        result.listPhase = [...listPhase];
        result.listSelectedStaff = [...listSelectedStaff];

        console.log(result);
        // console.log("ALO", moment(result.dueDateFrom).format("DD/MM/YYYY"))

        break;
      }
      default:
        break;
    }

    // if (!validationPromise) {
    //   return;
    // }

    // validationPromise.then((isValid) => {
    //   if (isValid) {
        nextStep();
    //     return;
    //   }
    // });

    return;
  };

  const initName = {
    defaultValue: defaultName,
  };

  // Render form
  const renderForm = (step) => {
    switch (step) {
      // Page 1
      case 1: {
        return (
          <section>
            <Row justify="space-between" gutter={[74, 0]}>
              {/* Plan name section */}
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="text-bold">
                      {t('modalCreatePlan.planName')}:
                    </span>
                  }
                  name="name"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: t('modalCreatePlan.planNameValidate'),
                    },
                  ]}
                >
                  <Input
                    placeholder={t('modalCreatePlan.planName')}
                  />
                </Form.Item>
              </Col>

              {/* Due date section  */}
              <Col span={12}>
                <Form.Item>
                  <Form.Item
                    label={
                      <span className="text-bold">
                        {t('modalCreatePlan.dueDate')}:
                      </span>
                    }
                    name="dueDateFrom"
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: t('modalCreatePlan.dueDateValidate'),
                      },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 14px)', marginBottom:"0" }}
                  >
                    <DatePicker format={dateFormat} style={{width: "100%"}}/>
                  </Form.Item>
                  <span
                    style={{ display: 'inline-block', width: '28px', textAlign: 'center', marginBottom:"0" }}
                  ></span>
                  <Form.Item
                    label={<></>}
                    name="dueDateTo"
                    // validateTrigger="onBlur"
                    // rules={[
                    //   {
                        // required: true,
                        // message: t('modalCreatePlan.dueDateValidate'),
                    //   },
                    // ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 14px)', marginBottom:"0" }}
                  >
                    <DatePicker format={dateFormat} style={{width: "100%"}}/>
                  </Form.Item>
                </Form.Item>
                
              </Col>
            </Row>
            {/* Staff list section  */}
            <Row gutter={[74, 0]}>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="text-bold">
                      {t('modalCreatePlan.listStaff')}:
                    </span>
                  }
                >
                  <div>
                  <Popover
                    content={<div>
                    {listStaff?.filter(el => el?.name.includes(filterStaff)).length > 0 ? listStaff?.filter(el => el?.name.includes(filterStaff)).map((staff) => {
                      return (<div key={staff?.id} className="group-staff" onClick={() => {handleAddToListSelectedStaff(staff)}}>
                        {staff?.type == "person" ? 
                          <Icon
                            src={personIcon}
                            width="12"
                            height="12"
                            margin="0px 10px 0px 8px"
                            minWidth="12"
                          /> : 
                          <Icon
                            src={groupPersonIcon}
                            width="14"
                            height="12"
                            margin="0px 9px 0px 7px"
                            minWidth="12"
                          />
                        }
                        <img src={avaterPerson}></img>
                        {staff?.name}
                      </div>)
                    }): 
                    'No data'
                    }
                    </div>}
                    title={<>
                      <Input 
                        className='input-search-staff' 
                        onChange={(e) => {setFilterStaff(e.target.value)}}
                        prefix={<Icon
                          src={searchIcon}
                          width="12"
                          height="12"
                          margin="0px 4px 0px 0px"
                          minWidth="12"
                        />}
                      />
                    </>}
                    trigger="click"
                    placement="bottomLeft"
                    overlayClassName="popover-add-staff"
                    // visible={this.state.visible}
                    // onVisibleChange={this.handleVisibleChange}
                  >
                    <Button
                      className='btn-add-staff'
                    >
                      <img
                        src={addUserIcon}
                      >
                      </img>
                    </Button>
                  </Popover>
                  {listSelectedStaff?.map((staff) => {
                      return (<div key={staff?.id} className="group-staff-tag">
                        {staff?.type == "person" ? 
                          <Icon
                            src={personIcon}
                            width="12"
                            height="12"
                            margin="0px 10px 0px 8px"
                            minWidth="12"
                          /> : 
                          <Icon
                            src={groupPersonIcon}
                            width="14"
                            height="12"
                            margin="0px 9px 0px 7px"
                            minWidth="12"
                          />
                        }
                        <img src={avaterPerson}></img>
                        {staff?.name?.length > 20 ? staff?.name.slice(0, 20) + '...' : staff?.name}
                        <Button
                          className='btn-delete-staff'
                          onClick={() => handleDeleteSelectedStaff(staff)}
                        >
                          <img
                            src={unionIcon}
                          >
                          </img>
                        </Button>
                      </div>)
                    })}  
                  </div>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <span className="text-bold">
                      {t('modalCreatePlan.specifyRole')}:
                    </span>
                  }
                  name="specifyRole"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: t('modalCreatePlan.specifyRoleValidate'),
                    },
                  ]}
                >
                  <Select
                    allowClear
                    style={{ width: 'calc(50% - 14px)' }}
                    placeholder={t('modalCreatePlan.choseRole')}
                  >
                    {listRole?.map((role) => {
                      return (
                        <Option key={role?.id} value={role?.id}>
                          <div className="d-flex align-items-center">
                            <Icon
                              src={personIcon}
                              width="12"
                              height="12"
                              margin="0px 4px 0px 0px"
                              minWidth="12"
                            />
                            {role?.name}
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            {/* Ckeditor section  */}
            <Form.Item
              label={
                <span className="text-bold">
                  {t('modalCreatePlan.planDescription')}:
                </span>
              }
              name="planDescription"
              className="m-0"
            >
              <CustomCkeditor
                onTextChange={(value) =>
                  handleCkeditorChange(value, 'planDescription')
                }
                initContent={'<p></p>'}
                placeholder="Viết mô tả"
              />
            </Form.Item>
          </section>
        );
      }

      // Page 2
      case 2:
        return (
          <section>
            {/* Schedule section */}
            <Form.Item
              label={
                <span className="text-bold">
                  {t('modalCreatePlan.scheduleSelection')}:
                </span>
              }
              name="schedule"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: t('modalCreatePlan.scheduleValidate'),
                },
              ]}
            >
              <Radio.Group name="schedule" onChange={handleScheduleChange}>
                <Radio value={WEEK_CODE}>{t('modalCreatePlan.week')}</Radio>
                <Radio value={MONTH_CODE}>{t('modalCreatePlan.month')}</Radio>
                <Radio value={PRECIOUS_CODE}>
                  {t('modalCreatePlan.precious')}
                </Radio>
                <Radio value={YEAR_CODE}>{t('modalCreatePlan.year')}</Radio>
                <Radio value={FREE_CODE}>{t('modalCreatePlan.useOnce')}</Radio>
              </Radio.Group>
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item>
                  <Form.Item
                    label={
                      <span className="text-bold">
                        {t('modalCreatePlan.startDate')}:
                      </span>
                    }
                    name="starDate"
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: t('modalCreatePlan.dueDateValidate'),
                      },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 14px)', marginBottom:"0" }}
                  >
                    <DatePicker format={dateFormat} style={{width: "100%"}}/>
                  </Form.Item>
                  <span
                    style={{ display: 'inline-block', width: '28px', textAlign: 'center', marginBottom:"0" }}
                  ></span>
                  <Form.Item
                    label={
                      <span className="text-bold">
                        {t('modalCreatePlan.endDate')}:
                      </span>
                    }
                    name="endDate"
                    validateTrigger="onBlur"
                    rules={[
                      {
                        required: true,
                        message: t('modalCreatePlan.dueDateValidate'),
                      },
                    ]}
                    style={{ display: 'inline-block', width: 'calc(50% - 14px)', marginBottom:"0" }}
                  >
                    <DatePicker format={dateFormat} style={{width: "100%"}}/>
                  </Form.Item>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={
                <span className="text-bold">
                  {t('modalCreatePlan.conditions')}:
                </span>
              }
              name="conditions"
              className="m-0"
            >
              <CustomCkeditor
                initContent={'<p></p>'}
                onTextChange={(value) =>
                  handleCkeditorChange(value, 'conditions')
                }
                placeholder="Viết mô tả"
              />
            </Form.Item>
          </section>
        );

      // Page 3
      case 3:
        return (
          <section>
            <Row justify="space-between">
              <Col span={11}>
                {/* Phasename section  */}
                <Form.Item
                  label={
                    <span className="text-bold">
                      {t('modalCreatePlan.phaseName')}:
                    </span>
                  }
                  name="phaseName"
                >
                  <Input placeholder={t('modalCreatePlan.phasePlaceHolder')} />
                </Form.Item>

                {/* Ckeditor section  */}
                <Form.Item
                  label={
                    <span className="text-bold">
                      {t('modalCreatePlan.phaseDescription')}:
                    </span>
                  }
                  name="phaseDescription"
                >
                  <CustomCkeditor
                    initContent={'<p></p>'}
                    onTextChange={(value) =>
                      handleCkeditorChange(value, 'phaseDescription')
                    }
                    placeholder="Viết mô tả"
                  />
                </Form.Item>

                <Button className='ant-btn-primary custom-btn' onClick={addPhase}>
                  {t('modalCreatePlan.add')}
                </Button>
              </Col>

              <Col span={11} className="ml-8">
                <span className="d-block text-bold pb-2 mb-0">
                  {t('modalCreatePlan.phaseAddedList')}:
                </span>

                {/* List phase  */}
                <DragDropList
                  source={listPhase}
                  removeCallBack={removePhase}
                ></DragDropList>
              </Col>
            </Row>
          </section>
        );
    }
  };

  return (
    <>
      <Modal
        title={
          <Row justify="space-between">
            <span className="text-bold">{t('createNewPlan')}</span>
            <Icon
              src={closeIcon}
              width="18"
              height="18"
              minWidth="18"
              onClick={() => setVisible(false)}
              style={{ cursor: 'pointer' }}
            />
          </Row>
        }
        visible={visible}
        key="create-plan"
        cancelText={t('modalCreatePlan.cancel')}
        okText={t('modalCreatePlan.ok')}
        width="900px"
        closable={false}
        className={"createPlan"}
        footer={
          <>
            <Row justify="space-between">
              <Col>
                <Step totalStep={3} currentStep={currentStep} />
              </Col>
              <Col>
                <button
                    type="button"
                    className="ant-btn"
                    onClick={() => previousStep()}
                  >
                    <span>Bỏ qua</span>
                </button>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary custom-btn"
                  onClick={() => submitForm()}
                >
                  <span>{currentStep < 3 ? "Tiếp theo" : "Tạo"}</span>
                </button>
              </Col>
            </Row>
          </>
        }
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={{
            schedule: WEEK_CODE,
            // scheduleDueDate: [moment(), moment().add(WEEK_VALUE, 'days')],
            name: initName.defaultValue
          }}
        >
          {renderForm(currentStep)}
        </Form>
      </Modal>
    </>
  );
  //#endregion
}

export default ModalCreatePlan;
