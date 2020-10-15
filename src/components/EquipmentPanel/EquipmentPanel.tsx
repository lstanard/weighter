import React from "react";

const EquipmentPanel = () => {
  const plateData = [{}];

  return (
    <div className="equipment-panel">
      <h2>Equipment</h2>
      <form>
        <section>
          <h3>Plates</h3>
          <p>
            <input id="plate-45" name="plate-45" type="checkbox" checked />
            <label htmlFor="plate-45">45 lb</label>
            <input
              id="plate-45-qty"
              name="plate-45-qty"
              type="text"
              value="2"
            />
          </p>
          <p>
            <input id="plate-35" name="plate-35" type="checkbox" checked />
            <label htmlFor="plate-35">35 lb</label>
            <input
              id="plate-35-qty"
              name="plate-35-qty"
              type="text"
              value="2"
            />
          </p>
          <p>
            <input id="plate-25" name="plate-25" type="checkbox" checked />
            <label htmlFor="plate-25">25 lb</label>
            <input
              id="plate-25-qty"
              name="plate-25-qty"
              type="text"
              value="2"
            />
          </p>
        </section>
      </form>
    </div>
  );
};

export default EquipmentPanel;
