import React, { useState } from "react"
import { Col, Row, Typography } from "antd";
import Button from "../../components/Button";
import AvatarGroup from "../../components/AvatarGroup/AvatarGroup";
import AvatarUser from "../../components/AvatarUser/AvatarUser";
import Clock from "../../components/Clock";
import Icon from "../../components/Icon";
import DropdownStatusTodoList from "../../components/Dropdown/DropdownStatusTodoList/DropdownStatusTodoList";
import Text from "../../components/Text";
import Step from "../../components/Step";
import InfiniteScrollCustom from "../../components/InfiniteScrollCustom/InfiniteScrollCustom";
import DragDropList from "../../components/List/DragDrop";
import DashedInput from "../../components/Input/DashedInput/DashedInput";
import InputBlock from "../../components/Input/InputBlock/InputBlock";
import FieldCheckbox from "../../components/Field/FieldCheckbox/FieldCheckbox";
import FieldDate from "../../components/Field/FieldDate/FieldDate";
import FieldFile from "../../components/Field/FieldFile/FieldFile";
import FieldLink from "../../components/Field/FieldLink/FieldLink";
import FieldNumber from "../../components/Field/FieldNumber/FieldNumber";
import FieldPerson from "../../components/Field/FieldPerson/FieldPerson";
import FieldPriority from "../../components/Field/FieldPriority/FieldPriority";
import FieldRangeNumber from "../../components/Field/FieldRangeNumber/FieldRangeNumber";
import FieldSelect from "../../components/Field/FieldSelect/FieldSelect";
import FieldSelectPhase from "../../components/Field/FieldSelectPhase/FieldSelectPhase";
// import FieldTag from "../../components/Field/FieldTag/FieldTag";
import FieldText from "../../components/Field/FieldText/FieldText";
import FieldTimeline from "../../components/Field/FieldTimeline/FieldTimeline";
// import FieldDate from "../../components/Field/FieldDate/FieldDate";
// import FieldDate from "../../components/Field/FieldDate/FieldDate";
// import FieldDate from "../../components/Field/FieldDate/FieldDate";





const { Title } = Typography;
const DemoCommon = () => {
  const [task, setTask] = useState(10)
  let arr = []
  for (let i = 1; i <= task ; i++ ) {
      arr.push(i)
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title>Common component</Title>
      <Row gutter={16} className="mb--10">
        <Col span={12}>
          <h1>Tên component: Button</h1>
          <Button></Button>
        </Col>
        <Col span={12}>
          <h1>Tên component: AvatarGroup</h1>
          <Row>
            <Col span={8}>
              <AvatarGroup data= {[{fullName: 'Nguyễn Văn An', srcAvatar:'',}]}/>
            </Col>
            <Col span={8}>
              <AvatarGroup data= {[
                  {fullName: 'Nguyễn Văn An', srcAvatar:''} , 
                  {fullName: 'Nguyễn Thị Bình', srcAvatar:'',}
                ]}
              />
            </Col>
            <Col span={8}>
              <AvatarGroup data= {[
                  {fullName: 'Nguyễn Văn An', srcAvatar:''},
                  {fullName: 'Nguyễn Thị Bình', srcAvatar:''},
                  {fullName: 'Nguyễn Văn Bắc', srcAvatar:''}
                ]}
              />
            </Col>
          </Row>
       </Col>
      </Row>

      <Row gutter={16} className="mb--10">
        <Col span={12}>
          <h1>Tên component: AvatarUser</h1>
          <AvatarUser />
        </Col>
        <Col span={12}>
          <h1>Tên component: Clock</h1>
          <Clock/>
       </Col>
      </Row>

      <Row gutter={16} className="mb--10">
        <Col span={12}>
          <h1>Tên component: Icon</h1>
          <Icon />
        </Col>
        <Col span={12}>
          <h1>Tên component: DropdownStatusTodoList</h1>
          <DropdownStatusTodoList/>
       </Col>
      </Row>

      <Row gutter={16} className="mb--10">
        <Col span={12}>
          <h1>Tên component: Text</h1>
          <Text />
        </Col>
        <Col span={12}>
          <h1>Tên component: Step</h1>
          <Step/>
       </Col>
      </Row>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: DashedInput</h1>
          <DashedInput style={{width: "200px"}} />
        </Col>
        <Col span={12}>
          <h1>Tên component: InputBlock</h1>
          <div style={{width: "320px"}}>
            <InputBlock />
          </div>
       </Col>
      </Row>

      <Row gutter={16} className="mb--10" style={{height:' 280px'}}>
        <Col span={12} >
          <div style={{width:'400px'}}>
            <h1>Tên component: DragDropList</h1>
            <DragDropList/>
          </div>
       </Col>
       <Col span={12}>
          <h1>Tên component: InfiniteScrollCustom</h1>
          <InfiniteScrollCustom
            dataLength={10}
            callbackRequest={()=> {
              if(task +10<= 30) {
                setTask(task + 10);
            }}}
            allDataLength={30}
            maxHeight= "100px"
          >
            {arr.map(x=> (<div key={x}> Task {x}</div>))}

          </InfiniteScrollCustom>
        </Col>
      </Row>



      <Title level={3}>Field</Title>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: FieldCheckbox</h1>
          <div style={{width: "20px"}}>
            <FieldCheckbox />
          </div>
        </Col>
        <Col span={12}>
          <h1>Tên component: FieldDate</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldDate/>
          </div>
       </Col>
      </Row>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: FieldFile</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldFile/>
          </div>
          <div style={{width: "100px", height:'32px'}}>
            <FieldFile
              value={[ { fileName: "File test thu 1", fileId: "id_file_test_1", fileMimeType: "image/jpeg" }]}
            />
            </div>
        </Col>
        <Col span={12}>
          <h1>Tên component: FieldLink</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldLink value={{
              url: "https://ant.design/docs/react/introduce",
              displayText: 'test link',
            }} />
          </div>
       </Col>
      </Row>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: FieldNumber</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldNumber />
          </div>
        </Col>
        <Col span={12}>
          <h1>Tên component: FieldPerson (cần api)</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldPerson />
          </div>
       </Col>
      </Row>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: FieldPriority (cần api)</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldPriority />
          </div>
        </Col>
        <Col span={12}>
          <h1>Tên component: FieldRangeNumber</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldRangeNumber />
          </div>
       </Col>
      </Row>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: FieldSelect (cần api)</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldSelect />
          </div>
        </Col>
        <Col span={12}>
          <h1>Tên component: FieldSelectPhase</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldSelectPhase />
          </div>
       </Col>
      </Row>

      <Row className="mb--10">
        <Col span={12}>
          <h1>Tên component: FieldTimeline</h1>
          <div>
            <FieldTimeline />
          </div>
        </Col>
        <Col span={12}>
          <h1>Tên component: FieldText</h1>
          <div style={{width: "100px", height:'32px'}}>
            <FieldText />
          </div>
       </Col>
      </Row>
    </div>
  );
};
export default DemoCommon;