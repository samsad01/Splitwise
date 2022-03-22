import { BinaryHeap } from "./heap.js";

var modal = document.getElementById("myModal");

var btn = document.getElementById("generate-personal-graph");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  
  modal.style.display = "block";
  

span.onclick = function() {
  document.getElementById("id1").value = "";
  document.getElementById("id2").value = "";
  document.getElementById("value").value = "";
  modal.style.display = "none";
}


window.onclick = function(event) {
  if (event.target == modal) {
    document.getElementById("id1").value = "";
  document.getElementById("id2").value = "";
  document.getElementById("value").value = "";
    modal.style.display = "none";
  }
}


let btt = document.getElementById("btt");
let btt1 = document.getElementById("btt1");

let arr=[];
btt.onclick=function()
{
  document.getElementById("mynetwork").innerHTML="";
  document.getElementById("mynetwork2").innerHTML="Click on solve to get Solution!";
  
    var id1 = document.getElementById("id1").value;
    var id2 = document.getElementById("id2").value;
    var val = document.getElementById("value").value;
    let data=[];
    data.push(id1);
    data.push(id2);
    data.push(val);
    arr.push(data);



btt1.onclick=function()
{
  document.getElementById("mynetwork").innerHTML="";
  document.getElementById("mynetwork2").innerHTML="Click on solve to get Solution!";
  document.getElementById("id1").value = "";
  document.getElementById("id2").value = "";
  document.getElementById("value").value = "";
    modal.style.display = "none";
    const mySet1 = new Set()
    let n = arr.length;
    for(let i =0;i<n;i++)
    {
        console.log(arr[i][0]+ " " +arr[i][1] + " "+ arr[i][2]);
        mySet1.add(arr[i][0]);
        mySet1.add(arr[i][1]);
    }
    const arr2=[];
    for (let item of mySet1)
    {
        arr2.push(item);
    }
    console.log(arr2);
    let curr_data;
  const container = document.getElementById("mynetwork");
  const container2 = document.getElementById("mynetwork2");
  const solve = document.getElementById("solve");
  const temptext = document.getElementById("temptext");

  const options = {
    edges: {
      arrows: {
        to: true,
      },
      labelHighlightBold: true,
      font: {
        size: 20,
      },
    },
    nodes: {
      font: "12px arial red",
      scaling: {
        label: true,
      },
      shape: "icon",
      icon: {
        face: "FontAwesome",
        code: "\uf183",
        size: 50,
        color: "#991133",
      },
    },
  };
  // initialize your network!
  let network = new vis.Network(container);
  network.setOptions(options);
  let network2 = new vis.Network(container2);
  network2.setOptions(options);
   
  function createData() {

    let nodes = [];
    for (let item of mySet1) {
      nodes.push({ id: item, label: "Person " + item });
    }
    nodes = new vis.DataSet(nodes);

   
    const edges = [];
    for (let i = 0; i < n; i++) {
      
        
            edges.push({
              from: arr[i][0],
              to: arr[i][1],
              label: arr[i][2],
            });
        
      
    }
    const data = {
      nodes: nodes,
      edges: edges,
    };
    return data;
  }


    const data = createData();
    curr_data = data;
    network.setData(data);
    temptext.style.display = "inline";
    container2.style.display = "none";


    solve.onclick = function () {
      temptext.style.display = "none";
      container2.style.display = "inline";
      const solvedData = solveData();
      network2.setData(solvedData);
    };
  
    function solveData() {
      let data = curr_data;
      const sz = data["nodes"].length;
      const vals = Array(sz).fill(0);
     
      for (let i = 0; i < data["edges"].length; i++) {
        const edge = data["edges"][i];
        vals[edge["to"] - 1] += parseInt(edge["label"]);
        vals[edge["from"] - 1] -= parseInt(edge["label"]);
      }
  
      const pos_heap = new BinaryHeap();
      const neg_heap = new BinaryHeap();
  
      for (let i = 0; i < sz; i++) {
        if (vals[i] > 0) {
          pos_heap.insert([vals[i], i]);
        } else {
          neg_heap.insert([-vals[i], i]);
          vals[i] *= -1;
        }
      }
  
      const new_edges = [];
      while (!pos_heap.empty() && !neg_heap.empty()) {
        const mx = pos_heap.extractMax();
        const mn = neg_heap.extractMax();
  
        const amt = Math.min(mx[0], mn[0]);
        const to = mx[1];
        const from = mn[1];
  
        new_edges.push({
          from: from + 1,
          to: to + 1,
          label: String(Math.abs(amt)),
        });
        vals[to] -= amt;
        vals[from] -= amt;
  
        if (mx[0] > mn[0]) {
          pos_heap.insert([vals[to], to]);
        } else if (mx[0] < mn[0]) {
          neg_heap.insert([vals[from], from]);
        }
      }
  
      data = {
        nodes: data["nodes"],
        edges: new_edges,
      };
      return data;
    }


 
}

}

}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



let genNew = document.getElementById("generate-graph");
 genNew.onclick=function() {

  document.getElementById("mynetwork").innerHTML="";
  document.getElementById("mynetwork2").innerHTML="Click on solve to get Solution!";
  let curr_data;
  const container = document.getElementById("mynetwork");
  const container2 = document.getElementById("mynetwork2"); 
  const solve = document.getElementById("solve");
  const temptext = document.getElementById("temptext");

  const options = {
    edges: {
      arrows: {
        to: true,
      },
      labelHighlightBold: true,
      font: {
        size: 20,
      },
    },
    nodes: {
      font: "12px arial red",
      scaling: {
        label: true,
      },
      shape: "icon",
      icon: {
        face: "FontAwesome",
        code: "\uf183",
        size: 50,
        color: "#991133",
      },
    },
  };
 
  let network = new vis.Network(container);
  network.setOptions(options);
  let network2 = new vis.Network(container2);
  network2.setOptions(options);

  function createData() {
    const sz = Math.floor(Math.random() * 8) + 2;

 
    let nodes = [];
    for (let i = 1; i <= sz; i++) {
      nodes.push({ id: i, label: "Person " + i });
    }
    nodes = new vis.DataSet(nodes);

  
    const edges = [];
    for (let i = 1; i <= sz; i++) {
      for (let j = i + 1; j <= sz; j++) {
        
        if (Math.random() > 0.5) {
          
          if (Math.random() > 0.5)
            edges.push({
              from: i,
              to: j,
              label: String(Math.floor(Math.random() * 100) + 1),
            });
          else
            edges.push({
              from: j,
              to: i,
              label: String(Math.floor(Math.random() * 100) + 1),
            });
        }
      }
    }
    const data = {
      nodes: nodes,
      edges: edges,
    };
    return data;
  }


    const data = createData();
    curr_data = data;
    network.setData(data);
    temptext.style.display = "inline";
    container2.style.display = "none";
 

  solve.onclick = function () {
    temptext.style.display = "none";
    container2.style.display = "inline";
    const solvedData = solveData();
    network2.setData(solvedData);
  };

  function solveData() {
    let data = curr_data;
    const sz = data["nodes"].length;
    const vals = Array(sz).fill(0);
    
    for (let i = 0; i < data["edges"].length; i++) {
      const edge = data["edges"][i];
      vals[edge["to"] - 1] += parseInt(edge["label"]);
      vals[edge["from"] - 1] -= parseInt(edge["label"]);
    }

    const pos_heap = new BinaryHeap();
    const neg_heap = new BinaryHeap();

    for (let i = 0; i < sz; i++) {
      if (vals[i] > 0) {
        pos_heap.insert([vals[i], i]);
      } else {
        neg_heap.insert([-vals[i], i]);
        vals[i] *= -1;
      }
    }

    const new_edges = [];
    while (!pos_heap.empty() && !neg_heap.empty()) {
      const mx = pos_heap.extractMax();
      const mn = neg_heap.extractMax();

      const amt = Math.min(mx[0], mn[0]);
      const to = mx[1];
      const from = mn[1];

      new_edges.push({
        from: from + 1,
        to: to + 1,
        label: String(Math.abs(amt)),
      });
      vals[to] -= amt;
      vals[from] -= amt;

      if (mx[0] > mn[0]) {
        pos_heap.insert([vals[to], to]);
      } else if (mx[0] < mn[0]) {
        neg_heap.insert([vals[from], from]);
      }
    }

    data = {
      nodes: data["nodes"],
      edges: new_edges,
    };
    return data;
  }

};



