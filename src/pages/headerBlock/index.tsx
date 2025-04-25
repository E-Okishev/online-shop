import { useCallback, useState } from "react";
import { Header } from "../../components/header/Header";
import { Navbar } from "../../components/navbar/Navbar";
import { Drawer } from "antd";
import { FilterParams } from "../../utils";

export const HeaderBlock = ({
  handleChangeFilters,
  searchParams,
}: FilterParams) => {
  const [showNawbar, setShowNawbar] = useState<boolean>(false);
  const toggleNavbar = useCallback(() => {
    setShowNawbar(!showNawbar);
  }, []);

  return (
    <>
      <Header
        handleChangeFilters={handleChangeFilters}
        toggleNavbar={toggleNavbar}
        searchParams={searchParams}
      />
      <Drawer
        open={showNawbar}
        placement="left"
        onClose={() => setShowNawbar(false)}
      >
        <Navbar
          handleChangeFilters={handleChangeFilters}
          searchParams={searchParams}
        />
      </Drawer>
    </>
  );
};
