import React from 'react';

const DeletePage = () => (
    <form action={window.location.pathname} method="post">
        <div>
            <label for="articleID">Item to delete: </label>
            <input type="articleID" id="articleID" name="articleID" />
        </div>   
        <div>
            <label for="password">Admin password: </label>
            <input type="text" id="password" name="password" />
        </div>   
        <div class="button">
            <button type="submit">Submit</button>
        </div>
    </form>
);

export default DeletePage;
