import { getStaff } from "./api";
import { useStaff } from "./StaffContext";

export const useStaffList = () => {
  const { setStaffList } = useStaff();

  const refetch = async () => {
    try {
      const response = await getStaff();
      setStaffList(response.data);
    } catch (error) {
      console.error("Error refetching staff:", error);
    }
  };

  return refetch;
};
