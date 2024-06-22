import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAdminUsers from "../Hooks/useAdminUsers";

const AdminUsers = () => {
  const { loading } = useContext(AuthContext);
  const [users, refetch, isPending] = useAdminUsers();
  const axiosSecure = useAxiosSecure();

  if (loading || isPending) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  const handleMakeAgent = (userId) => {
    axiosSecure
      .patch(`/admin/make-agent/${userId}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User promoted to agent successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to promote user to agent",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleMakeAdmin = (userId) => {
    axiosSecure
      .patch(`/admin/make-admin/${userId}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User promoted to admin successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to promote user to admin",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const handleMakeFraud = (userEmail) => {
    axiosSecure
      .patch(`/admin/make-fraud/${userEmail}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User marked as fraud successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to mark as fraud",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleDelete = (userEmail) => {
    axiosSecure
      .delete(`/admin/delete-user/${userEmail}`)
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to delete user",
          text: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen">
      <div className="text-center py-14 text-3xl font-semibold">
        <h1>All Users {`(${users.length})`}</h1>
      </div>
      <div className="overflow-x-auto w-11/12 mx-auto border-[1px] rounded-lg">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td className="text-center">{user.name}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">
                  {user.role == "agent" && (
                    <span className="text-center btn rounded-3xl">
                      Already {user.role}
                    </span>
                  )}
                  {user.role == "user" && (
                    <button
                      onClick={() => handleMakeAgent(user._id)}
                      className="btn rounded-3xl bg-green-400 text-white"
                    >
                      make agent
                    </button>
                  )}
                </td>
                <td className="text-center">
                  {(user.role == "user" || user.role == "agent") && (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="btn rounded-3xl bg-blue-400 text-white"
                    >
                      make admin
                    </button>
                  )}
                  {user.role == "admin" && (
                    <span className="text-center btn rounded-3xl">
                      already {user.role}
                    </span>
                  )}
                  {user.role == "fraud" && (
                    <span className="text-center btn rounded-3xl">
                      {user.role}
                    </span>
                  )}
                </td>
                <td className="text-center">
                  {user.role == "agent" && (
                    <button
                      onClick={() => handleMakeFraud(user.email)}
                      className="btn bg-orange-400 rounded-3xl text-white"
                    >
                      make as fraud
                    </button>
                  )}
                </td>

                <td className="text-center">
                  {user.power != "main" && (
                    <button
                      onClick={() => handleDelete(user.email)}
                      className="btn bg-orange-600 rounded-3xl text-white"
                    >
                      delete user
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
