import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LiveDelivery from "./LiveDelivery";
import Cancelled from "./Cancelled";
import SheduledDelivery from "./SheduledDelivery";
import { useState } from "react";

const Pickups = () => {
  const [activeTab, setActiveTab] = useState("Live");

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div>
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3 justify-content-center mt-2"
      >
        <Tab eventKey="Live" title="Live">
          {/* <LiveDelivery /> */}
        </Tab>
        <Tab eventKey="Scheduled" title="Scheduled">
          {/* <SheduledDelivery/> */}
        </Tab>
        <Tab eventKey="Cancelled" title="Cancelled">
          {/* <Cancelled /> */}
        </Tab>
      </Tabs>
      {activeTab === "Live" && <LiveDelivery />}
      {activeTab === "Scheduled" && <SheduledDelivery/>}
      {activeTab === "Cancelled" && <Cancelled />}
    </div>
  );
};

export default Pickups;
