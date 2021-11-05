import 'antd/dist/antd.css';
import './SkinHealth.css';
import { defaultItems } from '../../data/data.js';
import { useState, useEffect } from 'react';

//Icons
import { ArrowLeftOutlined, CreditCardOutlined, AppstoreOutlined, QuestionCircleOutlined, ClockCircleOutlined, StarTwoTone, MedicineBoxOutlined, LaptopOutlined } from '@ant-design/icons';
import { getTwoToneColor, setTwoToneColor } from '@ant-design/icons';


//This is AntDesignLayout
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const SkinHealth = () => {
  setTwoToneColor('yellow');
  getTwoToneColor(); // #eb2f96

  const [active, setActive] = useState('all');
  const [filterActive, setFilterActive] = useState([]);
  const [rightFilter, setRightFilter] = useState([]);
  const [key, setKey] = useState(0);
  const [statusOnline, setStatusOnline] = useState(true);
  //console.log(filterActive)
  //console.log(defaultItems[0].category[0].subCategory[0]);
  useEffect(() => {
    showAll();
  }, []); 

  function showAll() {
    const array = [];
    defaultItems.forEach((x) => {
      x.category.forEach((y) =>
        array.push({
          key: y.name,
          name: y.name,
          value: y.rdmValue,
          subCategory: y.subCategory
        })
      );
    });
    setFilterActive(array);
    setRightFilter(array[key].subCategory)
  }
  useEffect(() => [
    topHandler
  ], []);
  const topHandler = x => {
    if (x.name)
      setActive(x.name)
    console.log(active)
    if (x.category)
      setFilterActive(x.category);

    setRightFilter(x.category[key].subCategory)

    console.log("active:" + active);
    console.log("filterActive:" + filterActive);
    console.log("TypeError: Cannot read properties of undefined (reading 'subCategory')",x.category[key].subCategory)

  }

  const leftHandler = x => {
    setRightFilter(x.subCategory);
    setKey(x.key);
    console.log("rightFilter:" + rightFilter);
    console.log(x);
  }
  const rightHandler = x => {
    //setRightFilter(x.subCategory);
    console.log("rightFilter:" + x);
    setStatusOnline(x.online);
    // console.log(rightFilter);
    //console.log(status);
  }
  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <ArrowLeftOutlined /> <span>Back to services</span>
          <div className="site-layout-content-top">
            <div className="content-items">
              <div
                onClick={function () {
                  setActive("all");
                  showAll();
                }}
                className={active === "all" ? "item activeItem" : "item"}
                value={active}
              >
                <AppstoreOutlined
                  style={{ fontSize: "40px", color: "#54B2D3" }}
                  theme="outlined"
                />
                <span>All</span>
              </div>
              {defaultItems.map((x) => (
                <div
                  key={x.key}
                  onClick={() => {topHandler(x)}}
                  className={active === `${x.name}` ? "item activeItem" : "item"}
                >
                  <img src={x.icon} alt="icon" />
                  <span>{x.name}</span>
                </div>
              ))}

              <div className="item">
                <CreditCardOutlined
                  style={{ fontSize: "40px", color: "rgba(255, 166, 0, 0.501)" }}
                  theme="outlined"
                />
                <span>Voucher</span>
              </div>
            </div>

          </div>

          <div className="site-layout-content-left">
            <div>
              {filterActive.map((x) => (

                <div
                  onClick={() => { leftHandler(x) }}
                  key={x.key}
                  className={active === `${x.name}` ? "item activeItem" : "categoryItem"}
                  style={{ width: "420px", height: '40px', alignItems: 'center' }}>
                  <div ><span style={{ float: 'left' }}>{x.name}</span></div>
                  <div><span style={{ float: 'right' }}>{x.value}</span></div>
                </div>
              ))}
            </div>

          </div>

          <div className="site-layout-content-right">
            <div>

              <div
                onClick={function () {
                  //IF status = false
                  if (statusOnline === false) {
                    console.log(statusOnline);
                  }
                }}
                className="categorySwitch">
                <MedicineBoxOutlined />
                <span> In Clinic</span>
              </div>

              <div
                onClick={function () {
                  //IF status = true
                  if (statusOnline === true) {
                    console.log(statusOnline);
                  }
                }}
                className="categorySwitch">
                <LaptopOutlined />
                <span> Virtual Consultation</span>
              </div>

              {rightFilter.map((x) => (
                <div
                  onClick={() => rightHandler(x)}

                  key={x.key}
                  className="categoryItem">
                  <div className="categoryItemRight">
                    <div style={{ float: 'left' }}><span value={x.name}>{x.name} <QuestionCircleOutlined /></span></div>
                    <div style={{ float: 'right' }}><span> £ {x.price}</span></div>
                  </div>

                  <div className="categoryItemRight">
                    <div style={{ float: 'left' }}><span>{x.time} min <ClockCircleOutlined /></span></div>
                  </div>

                  <div className="categoryItemRight">
                    <div style={{ float: 'left' }}><span>
                      <StarTwoTone style={{ color: 'yellow' }} />
                      <StarTwoTone style={{ color: 'yellow' }} />
                      <StarTwoTone style={{ color: 'yellow' }} />
                      <StarTwoTone style={{ color: 'yellow' }} />
                      <StarTwoTone style={{ color: 'yellow' }} />
                      {x.review} reviews</span></div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </div>
  );
}
export default SkinHealth;

