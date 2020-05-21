import React, { useState, useEffect } from 'react';
import agent from '../../api/agent';
import { Table, Checkbox, Icon, Popup } from 'semantic-ui-react';
import { IUserSettings } from '../../models/user';
import LoadingComponent from '../../form/LoadingComponent';


const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUsers();
        setLoading(false);
    }, [])

    const getUsers = async () => {
        await agent.User.getuserslist()
            .then(response => {
                console.log(response);
                setUsers(response);
            })
            .catch(error => {
                console.log(error);
            })
    };

    const handleDelete = async (e:any, {value}:any) => {
        console.log(value);
        await agent.User.deleteUser(value)
            .then(response => {
            }).catch(error =>{
                console.log(error);
            })
            getUsers();
    };

    const handleLockoutUser = async (e:any, {value, checked}:any) => {
        const user = {} as IUserSettings;
        user.id = value;
        user.canLogIn = checked;
        console.log(user);
        await agent.User.changeLockoutStatus(user)
            .then(response => {
                checked = response;
            }).catch(error => {
                console.log(error);
            })
    }

    if (loading) return <LoadingComponent content='Ładowanie...' />

    return (
        <Table verticalAlign='middle' compact celled >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>Nazwa użytkownika</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Adres e-mail</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Ogłoszenia</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Logowanie</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Akcje</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {users.map((user: IUserSettings) => (
                    <Table.Row key={user.id}>
                        <Table.Cell textAlign='center'>{user.username}</Table.Cell>
                        <Table.Cell textAlign='center'>{user.email}</Table.Cell>
                        <Table.Cell textAlign='center'>{user.noticesListedCount}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Checkbox toggle value={user.id} defaultChecked={user.canLogIn} onChange={handleLockoutUser} />
                        </Table.Cell>
                        <Table.Cell textAlign='center'>                           
                            <Popup content='Usuń użytkownika' trigger={
                            <Icon value={user.id} onClick={handleDelete} name='user delete' style={{cursor:'pointer'}}/>
                            } />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
export default ManageUsers;