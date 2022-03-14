import React, { useState } from "react";

// SCSS
import "../../assets/scss/ghorwali-scss/dynamic-element-creator.scss";

const VariantInnerObj = (props) => {
  const [innerObj, setInnerObj] = useState([{}]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...innerObj];
    // console.log("Value...: ".value);
    list[index][name] = value;
    // console.log("handleInputChange/list...: ", list);
    setInnerObj(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    console.log("Inner Obj Index: ", index);
    const list = [...innerObj];
    list.splice(index, 1);
    setInnerObj(list);

    // props.innerObjCallbackFun(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInnerObj([...innerObj, {}]);
  };

  const dataSender = () => {
    props.innerObjCallbackFun(innerObj, props.variantIndex);
  };

  return (
    <div onBlur={dataSender}>
      {innerObj.map((x, i) => {
        return (
          <div style={{ display: "flex" }}>
            <input
              name="ram"
              placeholder="RAM"
              className="input-field"
              style={{ marginRight: "10px" }}
              value={x.ram}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              name="rom"
              placeholder="ROM"
              className="input-field"
              style={{ marginRight: "10px" }}
              value={x.rom}
              onChange={(e) => handleInputChange(e, i)}
            />
            <input
              name="basePrice"
              placeholder="Base Price"
              className="input-field"
              style={{ marginRight: "10px" }}
              value={x.basePrice}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div style={{ display: "flex" }}>
              {innerObj.length !== 1 && (
                <button
                  className="add-remove-btn"
                  style={{ width: "5vh" }}
                  onClick={() => handleRemoveClick(i)}
                >
                  -
                </button>
              )}
              {innerObj.length - 1 === i && (
                <button
                  className="add-remove-btn"
                  style={{ width: "5vh" }}
                  onClick={handleAddClick}
                >
                  +
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VariantInnerObj;