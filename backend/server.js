// Import required modules
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Enable JSON parsing
app.use(express.json());

// Function to fetch contest data
async function fetchContests() {
  try {
    const data = 'start=2025-02-24T00%3A00%3A00%2B05%3A30&end=2025-04-07T00%3A00%3A00%2B05%3A30&categories=calendar&search_query=&status=';
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.CLIST_URL,
      headers: { 
        'Accept': '*/*', 
        'Accept-Language': 'en-US,en;q=0.5', 
        'Connection': 'keep-alive', 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
        'Origin': process.env.CLIST_ORIGIN, 
        'Referer': process.env.CLIST_REFRER, 
        'Sec-Fetch-Dest': 'empty', 
        'Sec-Fetch-Mode': 'cors', 
        'Sec-Fetch-Site': 'same-origin', 
        'Sec-GPC': '1', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 
        'X-CSRFToken': '6SiNgAFvodWMCHUO0UeOIZxyAV10AuMu', 
        'X-Requested-With': 'XMLHttpRequest', 
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"macOS"', 
        'Cookie': 'csrftoken=6SiNgAFvodWMCHUO0UeOIZxyAV10AuMu; calendar_view=dayGridMonth; sessionid=negacrx0sm9s6s3dsocg47bip842twz2'
      },
      data: data
    };
    
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error('Error fetching contests:', error);
    return null;
  }
}

// Function to filter upcoming contests from specific platforms
function filterContests(contests) {
  if (!contests || !Array.isArray(contests)) {
    console.error('Invalid contest data');
    return [];
  }
  
  const currentDate = new Date();
  
  // Filter for CodeForces, LeetCode, and CodeChef contests that haven't ended yet
  const targetPlatforms = [
    'codeforces.com',
    'leetcode.com',
    'codechef.com'
  ];
  
  const filteredContests = contests.filter(contest => {
    const endDate = new Date(contest.end);
    const isPlatformMatch = targetPlatforms.some(platform => {
      return contest.host.toLowerCase().includes(platform);
    });
    
    return isPlatformMatch && endDate > currentDate;
  });
  
  // Sort by start date
  filteredContests.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
  
  return filteredContests;
}

// Function to organize contests by platform
function organizeContestsByPlatform(contests) {
  const groupedContests = {
    'CodeForces': [],
    'LeetCode': [],
    'CodeChef': []
  };
  
  contests.forEach(contest => {
    if (contest.host.toLowerCase().includes('codeforces')) {
      groupedContests['CodeForces'].push(contest);
    } else if (contest.host.toLowerCase().includes('leetcode')) {
      groupedContests['LeetCode'].push(contest);
    } else if (contest.host.toLowerCase().includes('codechef')) {
      groupedContests['CodeChef'].push(contest);
    }
  });
  
  return {
    groupedContests: groupedContests,
    totalCount: contests.length
  };
}

// Define routes
app.get('/', (req, res) => {
  res.send('Contest API Server is running. Use /api/contests to get filtered contest data.');
});

// API endpoint to get contests
app.get('/api/contests', async (req, res) => {
  try {
    const contests = await fetchContests();
    
    if (!contests) {
      return res.status(500).json({ 
        error: 'Failed to fetch contest data' 
      });
    }
    
    const filteredContests = filterContests(contests);
    const organizedContests = organizeContestsByPlatform(filteredContests);
    
    res.json(organizedContests);
  } catch (error) {
    console.error('Error in /api/contests endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Optional: Allow custom date ranges
app.post('/api/contests/custom', async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Both startDate and endDate are required' 
      });
    }
    
    const encodedStart = encodeURIComponent(startDate);
    const encodedEnd = encodeURIComponent(endDate);
    const data = `start=${encodedStart}&end=${encodedEnd}&categories=calendar&search_query=&status=`;
    
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://clist.by/get/events/',
      headers: {
        // Headers remain the same
        'Accept': '*/*', 
        'Accept-Language': 'en-US,en;q=0.5', 
        'Connection': 'keep-alive', 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 
        'Origin': 'https://clist.by', 
        'Referer': 'https://clist.by/', 
        'Sec-Fetch-Dest': 'empty', 
        'Sec-Fetch-Mode': 'cors', 
        'Sec-Fetch-Site': 'same-origin', 
        'Sec-GPC': '1', 
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36', 
        'X-CSRFToken': '6SiNgAFvodWMCHUO0UeOIZxyAV10AuMu', 
        'X-Requested-With': 'XMLHttpRequest', 
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"', 
        'sec-ch-ua-mobile': '?0', 
        'sec-ch-ua-platform': '"macOS"', 
        'Cookie': 'csrftoken=6SiNgAFvodWMCHUO0UeOIZxyAV10AuMu; calendar_view=dayGridMonth; sessionid=negacrx0sm9s6s3dsocg47bip842twz2'
      },
      data: data
    };
    
    const response = await axios.request(config);
    const contests = response.data;
    
    const filteredContests = filterContests(contests);
    const organizedContests = organizeContestsByPlatform(filteredContests);
    
    res.json(organizedContests);
  } catch (error) {
    console.error('Error in /api/contests/custom endpoint:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Contest API Server is running on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}/api/contests`);
});